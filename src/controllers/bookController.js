const Book = require("../models/Book");

const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      books
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks
};