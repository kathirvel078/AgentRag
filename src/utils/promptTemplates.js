const buildRAGPrompt = (
  context,
  question,
  systemInstruction = ""
) => {
  const safeContext = context?.trim()
    ? context
    : "No relevant content found in the book.";

  return `
You are BookMind AI, a professional AI assistant for technical books.

${systemInstruction}

STRICT RULES:
1. Use ONLY the provided context
2. Do NOT use outside knowledge
3. Do NOT guess or hallucinate
4. If answer is missing, reply exactly:
"This information is not available in the book."
5. Keep answers clear and professional

BOOK CONTEXT:
${safeContext}

USER QUESTION:
${question}

FINAL ANSWER:
`;
};

module.exports = {
  buildRAGPrompt
};


// const buildRAGPrompt = (context, question) => {
//   return `
// You are an AI assistant for a technical book.

// Rules:
// 1. Answer ONLY using the provided context
// 2. Do NOT use outside knowledge
// 3. If answer is not found, say:
//    "This information is not available in the book."
// 4. Keep answers clear and professional

// Context:
// ${context}

// User Question:
// ${question}

// Answer:
// `;
// };

// module.exports = {
//   buildRAGPrompt
// };