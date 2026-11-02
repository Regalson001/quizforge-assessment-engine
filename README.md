
# QuizForge — Interactive Quiz & Assessment Engine

![Project](https://img.shields.io/badge/Project-QuizForge-315efb)
![HTML5](https://img.shields.io/badge/HTML5-Frontend-orange)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Styling-38BDF8)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow)
![Status](https://img.shields.io/badge/Status-Portfolio_Project-success)

## Overview

QuizForge is a responsive, browser-based quiz and assessment engine designed to make knowledge evaluation interactive, measurable and accessible.

The application allows users to configure assessments, answer different types of questions, complete timed tests, receive automated scores and review their performance through detailed feedback.

It demonstrates practical frontend engineering concepts, including modular JavaScript architecture, state management, dynamic rendering, scoring algorithms, browser storage and responsive interface design.

## Key Features

### 1. Configurable Assessments
- Select from available assessment categories.
- Configure the number of questions.
- Choose an assessment duration.
- Enable or disable timed mode.
- Personalize an assessment using the candidate's name.

### 2. Multiple Question Types
- Single-select questions.
- Multiple-select questions.
- Free-text response questions.
- Configurable answer keys and explanations.

### 3. Timed Assessment Engine
- Countdown timer.
- Live progress indicator.
- Automatic submission when time expires.
- Previous and next question navigation.
- Answer preservation while navigating.

### 4. Automated Scoring
- Automatic answer validation.
- Correct and incorrect answer counts.
- Unanswered question tracking.
- Percentage-based performance calculation.
- Case-insensitive text answer comparison.

### 5. Results and Recommendations
- Final assessment score.
- Performance classification.
- Personalized feedback based on score thresholds.
- Time taken to complete the assessment.
- Topic-level performance breakdown.

### 6. Review Mode
- Review every question after submission.
- Compare submitted answers with correct answers.
- Read explanations for each question.
- Identify knowledge gaps and learning opportunities.

### 7. Local Performance History
- Stores recent assessment summaries in browser local storage.
- Preserves previous scores between page reloads.
- Limits stored history to the latest 20 attempts.

## Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Semantic application structure |
| Tailwind CSS | Utility-first styling |
| Custom CSS3 | Responsive layouts and visual design |
| JavaScript ES6+ | Application functionality |
| JavaScript Modules | Modular code organization |
| Local Storage API | Browser-based assessment history |
| Git | Version control |
| GitHub | Source code hosting |

## Project Architecture

```text
quizforge-assessment-engine/
│
├── index.html
├── README.md
├── .gitignore
│
├── css/
│   └── styles.css
│
└── js/
    ├── questions.js
    ├── state.js
    ├── analytics.js
    └── app.js
```

### Module Responsibilities

**index.html**
Defines the application interface, including setup, assessment, results and review screens.

**css/styles.css**
Contains the custom design system, responsive layouts, interactive states and reusable visual components.

**js/questions.js**
Contains the assessment question bank, answer keys, topics and explanations.

**js/state.js**
Maintains the active assessment state, navigation position, submitted answers and timer configuration.

**js/analytics.js**
Handles answer comparison, scoring, performance calculations, topic analytics and recommendation generation.

**js/app.js**
Connects the modules and manages application events, rendering, navigation, timing and results.

## Application Workflow

1. Candidate opens QuizForge.
2. Candidate enters their name and configures an assessment.
3. The application selects questions from the question bank.
4. The assessment interface displays one question at a time.
5. Candidate submits answers and navigates between questions.
6. The countdown timer tracks remaining time when timed mode is enabled.
7. The assessment is submitted manually or automatically.
8. The scoring engine evaluates the answers.
9. The analytics engine generates the results and recommendations.
10. The candidate reviews answers and explanations.
11. The assessment summary is saved in browser local storage.

## Getting Started

### Requirements

- A modern web browser.
- Visual Studio Code.
- Visual Studio Code Live Server extension, or another local HTTP development server.
- Git installed on your computer.
- A GitHub account for publishing the project.

### Installation

**Step 1 — Clone the repository**

```bash
git clone https://github.com/YOUR-USERNAME/quizforge-assessment-engine.git
```

**Step 2 — Open the project**

```bash
cd quizforge-assessment-engine
code .
```

**Step 3 — Run the application**

Open `index.html` using the Live Server extension.

Alternatively, run a local development server using Python:

```bash
python -m http.server 5500
```

Then visit:

```text
http://localhost:5500
```

JavaScript modules require an HTTP server in normal browser use; opening the HTML file directly through `file://` may prevent modules from loading.

## Assessment Configuration

New questions can be added to `js/questions.js`.

Each question supports the following properties:

| Property | Description |
|---|---|
| id | Unique question identifier |
| category | Assessment category |
| topic | Topic used for analytics |
| type | single, multiple or text |
| question | Question content |
| options | Available choices for selection questions |
| answer | Correct answer or accepted answers |
| explanation | Explanation displayed in review mode |

### Example Question

```javascript
{
  id: 11,
  category: "javascript",
  topic: "Functions",
  type: "single",
  question: "Which keyword defines a function?",
  options: ["function", "class", "return", "import"],
  answer: "function",
  explanation: "The function keyword declares a JavaScript function."
}
```

## Scoring and Performance Logic

The application calculates the percentage using:

Score = (Correct Answers / Total Questions) × 100

The current feedback thresholds are:

| Score | Performance feedback |
|---|---|
| 90–100% | Excellent performance |
| 70–89% | Good progress |
| 50–69% | Developing |
| 0–49% | More practice recommended |

Unanswered questions are counted separately and do not earn points.

## Data and Privacy

- Assessment answers are processed in the browser.
- Recent assessment summaries are stored in local storage.
- No backend database or external account is required.
- No user authentication is currently implemented.
- Clearing browser storage removes locally saved assessment history.

## Current Limitations

- Text answers use exact case-insensitive matching against accepted answers.
- Results are stored locally rather than centrally.
- The application does not currently support administrator accounts.
- There is no backend API or database integration.
- The question bank is maintained in JavaScript.

## Future Development Roadmap

### Phase 2 — Advanced Assessment Features
- Question randomization and difficulty levels.
- Question banks loaded from JSON.
- More detailed analytics dashboards.
- Assessment export to PDF.
- Accessibility and keyboard-navigation improvements.

### Phase 3 — Backend Integration
- Node.js and Express API.
- PostgreSQL database.
- User authentication and authorization.
- Persistent assessment history.
- Administrator assessment management.

### Phase 4 — Advanced Analytics
- Performance trends over time.
- Candidate comparison dashboards.
- Topic-level learning recommendations.
- AI-assisted explanation generation.
- Organization-level assessment reporting.

## Engineering Concepts Demonstrated

This project demonstrates:

- Modular JavaScript architecture.
- Centralized state management.
- Dynamic DOM rendering.
- Event-driven programming.
- Conditional application flows.
- Countdown and timer management.
- Data validation.
- Scoring algorithms.
- Performance analytics.
- Browser storage.
- Responsive frontend engineering.

## Author

**Stephen Oyugi Nyarangi**

AI Automation Engineer | Full-Stack AI & Machine Learning Development

- GitHub: https://github.com/Regalson001
- LinkedIn: https://linkedin.com/in/stephenoyugi001

## License

This project is available under the MIT License.
