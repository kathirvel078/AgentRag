const Chat = require("../models/Chat");
const { retrieveRelevantChunks } = require("../services/retrievalService");
const { generateAnswer } = require("../services/ragService");

const askQuestion = async (req, res, next) => {
  try {
    const { bookId, question } = req.body;

    if (!bookId || !question) {
      return res.status(400).json({
        success: false,
        message: "bookId and question are required"
      });
    }

    /*
    Retrieve Relevant Chunks
    */
<<<<<<< HEAD
    const chunks = await retrieveRelevantChunks(bookId, question);  //best matching chunk
=======
    // const chunks = await retrieveRelevantChunks(question);
    const chunks = await retrieveRelevantChunks(bookId, question);
>>>>>>> 492d4c0928dad2e50b58b28bd3fa266318868b29

    /*
    Build Context
    */
    const context = chunks
      .map((chunk) => chunk.content)
      .join("\n\n");

    /*
    Generate Final Answer
    */
    const answer = await generateAnswer(context, question);

    /*
    Save Chat History
    */
    const savedChat = await Chat.create({
      bookId,
      question,
      answer,
      retrievedChunks: chunks
    });

    res.status(200).json({
      success: true,
      answer,
      sources: chunks,
      chatId: savedChat._id
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  askQuestion
};