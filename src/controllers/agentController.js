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
      intent: result.intent,
      answer: result.answer,
      sources: result.sources
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  runAgent
};