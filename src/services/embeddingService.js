const ollamaClient = require("../config/ollama");

const generateEmbedding = async (text) => {
  try {
    const response = await ollamaClient.post("/api/embeddings", {
      model: "nomic-embed-text",
      prompt: text
    });

    return response.data.embedding;
  } catch (error) {
    throw new Error("Embedding generation failed");
  }
};

module.exports = {
  generateEmbedding
};


// const axios = require("axios");

// const generateEmbedding = async (text) => {
//   try {
//     const response = await axios.post(
//       `${process.env.OLLAMA_BASE_URL}/api/embeddings`,
//       {
//         // model: "nomic-embed-text",
//         model: "llama3.2:latest",
//         prompt: text
//       }
//     );

//     return response.data.embedding;
//   } catch (error) {
//     throw new Error("Embedding generation failed");
//   }
// };

// module.exports = {
//   generateEmbedding
// };