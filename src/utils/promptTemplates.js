const buildRAGPrompt = (context, question) => {
  return `
You are an AI assistant for a technical book.

Rules:
1. Answer ONLY using the provided context
2. Do NOT use outside knowledge
3. If answer is not found, say:
   "This information is not available in the book."
4. Keep answers clear and professional

Context:
${context}

User Question:
${question}

Answer:
`;
};

module.exports = {
  buildRAGPrompt
};