const { executeAgentTask } = require("../services/agentService");

const runAgent = async (req, res, next) => {
  try {
    const {bookId, query } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Query is required"
      });
    }

    const result = await executeAgentTask(bookId, query);

    res.status(200).json({
      success: true,
<<<<<<< HEAD
      intent: result.intent,   //summarize
      answer: result.answer,   //Chapter 2 discusses...
      sources: result.sources   //"Page 15", "Page 16"
=======
      intent: result.intent,
      answer: result.answer,
      sources: result.sources
>>>>>>> 492d4c0928dad2e50b58b28bd3fa266318868b29
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  runAgent
};