
import { questionBank } from "./questions.js";
import {
  state,
  resetState,
  saveAnswer,
  getAnswer,
  getCurrentQuestion,
  moveToQuestion
} from "./state.js";
import { calculateResults } from "./analytics.js";

const $ = id => document.getElementById(id);

const screens = {
  setup: $("setup-screen"),
  quiz: $("quiz-screen"),
  results: $("results-screen"),
  review: $("review-screen")
};

let latestResults = null;

function showScreen(name) {
  Object.entries(screens).forEach(([key, element]) => {
    element.classList.toggle("hidden", key !== name);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function getSelectedQuestions(category, count) {
  const pool = questionBank.filter(question =>
    category === "all" || question.category === category
  );

  return [...pool]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.min(count, pool.length));
}

function startAssessment() {
  const candidate = $("candidate-name").value.trim();
  const category = $("quiz-category").value;
  const count = Number($("question-count").value);
  const durationMinutes = Number($("duration").value);
  const timed = $("timed-mode").checked;

  $("setup-error").textContent = "";

  if (!candidate) {
    $("setup-error").textContent = "Please enter your name before starting.";
    $("candidate-name").focus();
    return;
  }

  const selected = getSelectedQuestions(category, count);

  if (!selected.length) {
    $("setup-error").textContent = "No questions are available for this assessment.";
    return;
  }

  resetState();

  state.candidate = candidate;
  state.questions = selected;
  state.durationSeconds = timed ? durationMinutes * 60 : 0;
  state.remainingSeconds = state.durationSeconds;
  state.isTimed = timed && durationMinutes > 0;
  state.startedAt = Date.now();

  $("quiz-title").textContent =
    category === "all" ? "General knowledge" :
    category === "javascript" ? "JavaScript fundamentals" :
    "Web development";

  showScreen("quiz");
  renderQuestion();

  if (state.isTimed) {
    $("timer-box").classList.remove("hidden");
    updateTimerDisplay();
    state.timerId = setInterval(tickTimer, 1000);
  } else {
    $("timer-box").classList.add("hidden");
  }
}

function tickTimer() {
  if (state.submitted) return;

  state.remainingSeconds = Math.max(0, state.remainingSeconds - 1);
  updateTimerDisplay();

  if (state.remainingSeconds <= 0) {
    state.autoSubmitted = true;
    submitAssessment();
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;
}

function updateTimerDisplay() {
  $("timer").textContent = formatTime(state.remainingSeconds);
  $("timer-box").classList.toggle("warning", state.remainingSeconds <= 60);
}

function renderQuestion() {
  const question = getCurrentQuestion();
  if (!question) return;

  const index = state.currentIndex;
  const total = state.questions.length;
  const percentage = Math.round(((index + 1) / total) * 100);

  $("question-progress").textContent = `Question ${index + 1} of ${total}`;
  $("progress-percent").textContent = `${percentage}%`;
  $("progress-bar").style.width = `${percentage}%`;
  $("question-category").textContent = question.topic;
  $("question-type").textContent = {
    single: "Single choice",
    multiple: "Select all correct answers",
    text: "Written response"
  }[question.type];

  $("question-text").textContent = question.question;
  $("question-instruction").textContent =
    question.type === "multiple"
      ? "You may select more than one answer."
      : question.type === "text"
        ? "Type your answer in the box below."
        : "Select the best answer.";

  $("answer-error").textContent = "";

  const saved = getAnswer(question.id);
  const area = $("answer-area");

  if (question.type === "text") {
    area.innerHTML = `
      <textarea id="text-response" class="text-answer"
        placeholder="Type your answer here...">${escapeHTML(saved ?? "")}</textarea>
    `;
  } else {
    area.innerHTML = question.options.map((option, optionIndex) => {
      const selected = question.type === "multiple"
        ? Array.isArray(saved) && saved.includes(option)
        : saved === option;

      return `
        <label class="answer-option ${selected ? "selected" : ""}">
          <input
            type="${question.type === "multiple" ? "checkbox" : "radio"}"
            name="answer"
            value="${escapeHTML(option)}"
            ${selected ? "checked" : ""}
          >
          <span>${escapeHTML(option)}</span>
        </label>
      `;
    }).join("");

    area.querySelectorAll("input").forEach(input => {
      input.addEventListener("change", () => {
        if (question.type === "single") {
          saveAnswer(question.id, input.value);
        } else {
          const checked = [...area.querySelectorAll("input:checked")]
            .map(item => item.value);
          saveAnswer(question.id, checked);
        }

        renderSelectionState();
      });
    });
  }

  $("previous-btn").disabled = index === 0;
  $("previous-btn").style.opacity = index === 0 ? "0.45" : "1";

  const isLast = index === total - 1;
  $("next-btn").classList.toggle("hidden", isLast);
  $("submit-btn").classList.toggle("hidden", !isLast);
}

function renderSelectionState() {
  document.querySelectorAll(".answer-option").forEach(option => {
    const input = option.querySelector("input");
    option.classList.toggle("selected", input.checked);
  });
}

function captureCurrentAnswer() {
  const question = getCurrentQuestion();
  if (!question) return;

  if (question.type === "text") {
    const input = $("text-response");
    if (input) saveAnswer(question.id, input.value.trim());
  }
}

function validateCurrentAnswer() {
  captureCurrentAnswer();

  const question = getCurrentQuestion();
  const answer = getAnswer(question.id);

  const isEmpty = Array.isArray(answer)
    ? answer.length === 0
    : answer === null || answer === undefined || String(answer).trim() === "";

  if (isEmpty) {
    $("answer-error").textContent = "Please answer this question before continuing.";
    return false;
  }

  $("answer-error").textContent = "";
  return true;
}

function goNext() {
  if (!validateCurrentAnswer()) return;

  if (moveToQuestion(state.currentIndex + 1)) {
    renderQuestion();
  }
}

function goPrevious() {
  captureCurrentAnswer();

  if (moveToQuestion(state.currentIndex - 1)) {
    renderQuestion();
  }
}

function submitAssessment() {
  if (state.submitted) return;

  captureCurrentAnswer();

  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }

  state.submitted = true;
  state.finishedAt = Date.now();

  latestResults = calculateResults(state.questions, state.answers);

  const timeUsed = state.isTimed
    ? state.durationSeconds - state.remainingSeconds
    : Math.floor((state.finishedAt - state.startedAt) / 1000);

  displayResults(latestResults, timeUsed);
  saveAssessment(latestResults, timeUsed);
  showScreen("results");
}

function displayResults(results, timeUsed) {
  $("result-greeting").textContent = `Well done, ${state.candidate}!`;
  $("result-message").textContent = state.autoSubmitted
    ? "Your time expired. Here is your assessment result."
    : "Your assessment has been submitted successfully.";

  $("score-percent").textContent = `${results.percentage}%`;
  $("score-detail").textContent =
    `${results.correct} out of ${results.total} correct answers`;

  $("correct-count").textContent = results.correct;
  $("incorrect-count").textContent = results.incorrect;
  $("unanswered-count").textContent = results.unanswered;
  $("time-used").textContent = formatTime(timeUsed);

  $("score-badge").textContent =
    results.percentage >= 90 ? "Excellent" :
    results.percentage >= 70 ? "Good progress" :
    results.percentage >= 50 ? "Developing" :
    "Keep practising";

  $("recommendation-title").textContent = results.recommendation.title;
  $("recommendation-text").textContent = results.recommendation.message;

  $("topic-breakdown").innerHTML = results.topics.map(topic => `
    <div class="topic-row">
      <div class="topic-heading">
        <span>${escapeHTML(topic.name)}</span>
        <span>${topic.percentage}% (${topic.correct}/${topic.total})</span>
      </div>
      <div class="topic-track">
        <div class="topic-fill" style="width:${topic.percentage}%"></div>
      </div>
    </div>
  `).join("");
}

function saveAssessment(results, timeUsed) {
  const record = {
    candidate: state.candidate,
    date: new Date().toISOString(),
    score: results.percentage,
    correct: results.correct,
    total: results.total,
    timeUsed
  };

  try {
    const history = JSON.parse(
      localStorage.getItem("quizforge-history") || "[]"
    );

    history.unshift(record);
    localStorage.setItem(
      "quizforge-history",
      JSON.stringify(history.slice(0, 20))
    );
  } catch (error) {
    console.warn("Assessment history could not be saved:", error);
  }
}

function renderReview() {
  if (!latestResults) return;

  $("review-list").innerHTML = latestResults.reviewed.map((question, index) => {
    const submitted = Array.isArray(question.submitted)
      ? question.submitted.join(", ")
      : question.submitted || "Not answered";

    const correctAnswer = Array.isArray(question.answer)
      ? question.answer.join(", ")
      : question.answer;

    return `
      <article class="review-item ${question.correct ? "" : "incorrect"}">
        <h3>${index + 1}. ${escapeHTML(question.question)}</h3>
        <p class="muted-text">${escapeHTML(question.topic)}</p>
        <p class="${question.correct ? "correct-text" : "incorrect-text"}">
          <strong>Your answer:</strong> ${escapeHTML(submitted)}
        </p>
        <p class="correct-text">
          <strong>Correct answer:</strong> ${escapeHTML(correctAnswer)}
        </p>
        <p class="explanation">
          <strong>Explanation:</strong> ${escapeHTML(question.explanation)}
        </p>
      </article>
    `;
  }).join("");
}

function restartAssessment() {
  resetState();
  latestResults = null;
  showScreen("setup");
}

$("start-btn").addEventListener("click", startAssessment);
$("next-btn").addEventListener("click", goNext);
$("previous-btn").addEventListener("click", goPrevious);
$("submit-btn").addEventListener("click", () => {
  if (validateCurrentAnswer()) submitAssessment();
});

$("review-btn").addEventListener("click", () => {
  renderReview();
  showScreen("review");
});

$("back-results-btn").addEventListener("click", () => showScreen("results"));
$("restart-btn").addEventListener("click", restartAssessment);

// Warn the candidate before accidentally leaving an active assessment.
window.addEventListener("beforeunload", event => {
  if (state.startedAt && !state.submitted) {
    event.preventDefault();
    event.returnValue = "";
  }
});

showScreen("setup");
