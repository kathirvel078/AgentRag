const { retrieveRelevantChunks } = require("./retrievalService");
const { generateAnswer } = require("./ragService");

const detectIntent = (query) => {
  const lower = query.toLowerCase();

  if (lower.includes("summarize")) return "summarize";
  if (lower.includes("quiz")) return "quiz";
  if (lower.includes("compare")) return "compare";

  return "ask";
};

const executeAgentTask = async (bookId, query) => {
  const intent = detectIntent(query);

  let systemInstruction = "";

  switch (intent) {
    case "summarize":
      systemInstruction =
        "Provide a clean technical summary from the retrieved content.";
      break;

    case "quiz":
      systemInstruction =
        "Generate professional MCQ quiz questions from the retrieved content.";
      break;

    case "compare":
      systemInstruction =
        "Provide a structured technical comparison using only retrieved context.";
      break;

    default:
      systemInstruction =
        "Answer the question clearly using only retrieved context.";
  }

  let chunks = await retrieveRelevantChunks(bookId, query, 5);

  let context = chunks
    .map((chunk) => chunk.content)
    .join("\n\n");

  let finalPrompt = `
${systemInstruction}

Context:
${context}

User Request:
${query}

Response:
`;

  // let answer = await generateAnswer(context, finalPrompt);
  let answer = await generateAnswer(
  context,
  query,
  systemInstruction);

  if (
  answer.toLowerCase().includes("not available") ||
  answer.length < 30
){
    chunks = await retrieveRelevantChunks(bookId, query, 8);

    context = chunks
      .map((chunk) => chunk.content)
      .join("\n\n");

    answer = await generateAnswer(context, finalPrompt);
  }

  return {
    intent,
    answer,
    sources: chunks
  };
};

module.exports = {
  executeAgentTask
};