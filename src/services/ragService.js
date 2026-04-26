const ollamaClient = require("../config/ollama");
const { buildRAGPrompt } = require("../utils/promptTemplates");

const generateAnswer = async (context, question) => {
  try {
    const prompt = buildRAGPrompt(context, question);

    const response = await ollamaClient.post("/api/generate", {
      model: "llama3.2:latest",
      prompt,
      stream: false
    });

    return response.data.response;
  } catch (error) {
    throw new Error("Answer generation failed");
  }
};

module.exports = {
  generateAnswer
};