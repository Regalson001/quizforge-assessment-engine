
export const questionBank = [
  {
    id: 1,
    category: "javascript",
    topic: "JavaScript fundamentals",
    type: "single",
    question: "Which keyword declares a block-scoped variable that can be reassigned?",
    options: ["var", "let", "const", "static"],
    answer: "let",
    explanation: "The let keyword declares a block-scoped variable that can be reassigned."
  },
  {
    id: 2,
    category: "javascript",
    topic: "JavaScript fundamentals",
    type: "single",
    question: "Which method converts a JSON string into a JavaScript object?",
    options: [
      "JSON.stringify()",
      "JSON.parse()",
      "JSON.convert()",
      "Object.parse()"
    ],
    answer: "JSON.parse()",
    explanation: "JSON.parse() reads JSON text and creates the corresponding JavaScript value."
  },
  {
    id: 3,
    category: "javascript",
    topic: "JavaScript fundamentals",
    type: "multiple",
    question: "Which of the following are JavaScript primitive types?",
    options: ["String", "Boolean", "Array", "Undefined", "Number"],
    answer: ["String", "Boolean", "Undefined", "Number"],
    explanation: "String, Boolean, Undefined and Number are primitive types. Arrays are objects."
  },
  {
    id: 4,
    category: "javascript",
    topic: "JavaScript fundamentals",
    type: "text",
    question: "Which array method creates a new array by transforming each element?",
    answer: ["map", "map()"],
    explanation: "Array.prototype.map() creates a new array containing the results of calling a function on every element."
  },
  {
    id: 5,
    category: "javascript",
    topic: "JavaScript fundamentals",
    type: "single",
    question: "What does === check in JavaScript?",
    options: [
      "Value only",
      "Type only",
      "Value and type without coercion",
      "Whether two variables have the same name"
    ],
    answer: "Value and type without coercion",
    explanation: "Strict equality compares values without converting their types."
  },
  {
    id: 6,
    category: "web",
    topic: "Web development",
    type: "single",
    question: "What does HTML primarily define?",
    options: [
      "Page structure and content",
      "Database queries",
      "Server authentication",
      "Network routing"
    ],
    answer: "Page structure and content",
    explanation: "HTML provides the structure and semantic meaning of web page content."
  },
  {
    id: 7,
    category: "web",
    topic: "Web development",
    type: "multiple",
    question: "Which technologies are commonly used on the frontend of websites?",
    options: ["HTML", "CSS", "JavaScript", "SQL"],
    answer: ["HTML", "CSS", "JavaScript"],
    explanation: "HTML, CSS and JavaScript are core frontend technologies. SQL is primarily used to query databases."
  },
  {
    id: 8,
    category: "web",
    topic: "Web development",
    type: "text",
    question: "What does CSS stand for?",
    answer: ["cascading style sheets"],
    explanation: "CSS stands for Cascading Style Sheets and controls the presentation of web documents."
  },
  {
    id: 9,
    category: "general",
    topic: "General knowledge",
    type: "single",
    question: "Which data structure follows the First In, First Out principle?",
    options: ["Stack", "Queue", "Tree", "Graph"],
    answer: "Queue",
    explanation: "A queue processes items in the order they were added: First In, First Out."
  },
  {
    id: 10,
    category: "general",
    topic: "General knowledge",
    type: "single",
    question: "What is the primary purpose of an API?",
    options: [
      "To define how software systems communicate",
      "To style a web page",
      "To compress images",
      "To replace an operating system"
    ],
    answer: "To define how software systems communicate",
    explanation: "An API defines rules and interfaces through which software components exchange information."
  }
];
