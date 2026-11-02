
function normalize(value) {
  return String(value ?? "").trim().toLowerCase();
}

function compareAnswers(question, submitted) {
  if (submitted === null || submitted === undefined || submitted === "") {
    return false;
  }

  if (question.type === "multiple") {
    if (!Array.isArray(submitted)) return false;

    const expected = question.answer.map(normalize).sort();
    const actual = submitted.map(normalize).sort();

    return expected.length === actual.length &&
      expected.every((value, index) => value === actual[index]);
  }

  if (question.type === "text") {
    const accepted = Array.isArray(question.answer)
      ? question.answer
      : [question.answer];

    return accepted.some(value => normalize(value) === normalize(submitted));
  }

  return normalize(question.answer) === normalize(submitted);
}

export function calculateResults(questions, answers) {
  const reviewed = questions.map(question => {
    const submitted = answers[question.id] ?? null;
    const answered = Array.isArray(submitted)
      ? submitted.length > 0
      : submitted !== null && String(submitted).trim() !== "";

    return {
      ...question,
      submitted,
      answered,
      correct: answered && compareAnswers(question, submitted)
    };
  });

  const total = reviewed.length;
  const correct = reviewed.filter(q => q.correct).length;
  const incorrect = reviewed.filter(q => q.answered && !q.correct).length;
  const unanswered = total - correct - incorrect;
  const percentage = total ? Math.round((correct / total) * 100) : 0;

  const topicMap = {};

  reviewed.forEach(question => {
    const topic = question.topic || "General";
    if (!topicMap[topic]) {
      topicMap[topic] = { total: 0, correct: 0 };
    }

    topicMap[topic].total++;
    if (question.correct) topicMap[topic].correct++;
  });

  const topics = Object.entries(topicMap).map(([name, data]) => ({
    name,
    total: data.total,
    correct: data.correct,
    percentage: Math.round((data.correct / data.total) * 100)
  }));

  return {
    reviewed,
    total,
    correct,
    incorrect,
    unanswered,
    percentage,
    topics,
    recommendation: getRecommendation(percentage)
  };
}

export function getRecommendation(score) {
  if (score >= 90) {
    return {
      title: "Excellent performance",
      message: "You demonstrated a strong understanding of the assessment. Challenge yourself with more advanced questions and practical projects."
    };
  }

  if (score >= 70) {
    return {
      title: "Good progress",
      message: "You have a good foundation. Review the questions you missed and practise the topics where your score was lower."
    };
  }

  if (score >= 50) {
    return {
      title: "Keep building your skills",
      message: "You understand some of the material, but there are areas to strengthen. Revisit the explanations and take the assessment again."
    };
  }

  return {
    title: "More practice recommended",
    message: "Use this result as a learning guide. Study the explanations, revisit the fundamentals and try another assessment when ready."
  };
}
