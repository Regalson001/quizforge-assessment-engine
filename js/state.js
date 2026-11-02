
export const state = {
  candidate: "",
  questions: [],
  answers: {},
  currentIndex: 0,
  durationSeconds: 0,
  remainingSeconds: 0,
  startedAt: null,
  finishedAt: null,
  timerId: null,
  isTimed: true,
  submitted: false,
  autoSubmitted: false
};

export function resetState() {
  if (state.timerId) {
    clearInterval(state.timerId);
  }

  state.candidate = "";
  state.questions = [];
  state.answers = {};
  state.currentIndex = 0;
  state.durationSeconds = 0;
  state.remainingSeconds = 0;
  state.startedAt = null;
  state.finishedAt = null;
  state.timerId = null;
  state.isTimed = true;
  state.submitted = false;
  state.autoSubmitted = false;
}

export function saveAnswer(questionId, answer) {
  state.answers[questionId] = answer;
}

export function getAnswer(questionId) {
  return state.answers[questionId] ?? null;
}

export function getCurrentQuestion() {
  return state.questions[state.currentIndex] ?? null;
}

export function moveToQuestion(index) {
  if (index < 0 || index >= state.questions.length) return false;
  state.currentIndex = index;
  return true;
}
