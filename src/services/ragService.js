const ollamaClient = require("../config/ollama");
const { buildRAGPrompt } = require("../utils/promptTemplates");

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

    const response = await ollamaClient.post("/api/generate", {
      model: "llama3.2:latest",
      prompt,
      stream: false
    });

    return response.data.response;
  } catch (error) {
    console.error("RAG ERROR:", error.message);
    throw new Error("Answer generation failed");
  }
};

module.exports = {
  generateAnswer
};