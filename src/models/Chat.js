const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true
    },

    question: {
      type: String,
      required: true
    },

    answer: {
      type: String,
      required: true
    },

    retrievedChunks: [
      {
        chunkNumber: Number,
        content: String
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Chat", chatSchema);