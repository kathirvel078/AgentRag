const ollamaClient = require("../config/ollama");
const { buildRAGPrompt } = require("../utils/promptTemplates");

<<<<<<< HEAD
const generateAnswer = async (
  context,
  question,
  systemInstruction = ""
) => {
  try {
    const prompt = buildRAGPrompt(
      context,
      question,
      systemInstruction
    );
=======
const generateAnswer = async (context, question) => {
  try {
    const prompt = buildRAGPrompt(context, question);
>>>>>>> 492d4c0928dad2e50b58b28bd3fa266318868b29

    const response = await ollamaClient.post("/api/generate", {
      model: "llama3.2:latest",
      prompt,
      stream: false
    });

    return response.data.response;
  } catch (error) {
<<<<<<< HEAD
    console.error("RAG ERROR:", error.message);
=======
>>>>>>> 492d4c0928dad2e50b58b28bd3fa266318868b29
    throw new Error("Answer generation failed");
  }
};

module.exports = {
  generateAnswer
};