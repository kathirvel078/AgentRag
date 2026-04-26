const axios = require("axios");

const ollamaClient = axios.create({
  baseURL: process.env.OLLAMA_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 120000
});

module.exports = ollamaClient;


//taskkill /F /IM ollama.exe
// ollama serve  

