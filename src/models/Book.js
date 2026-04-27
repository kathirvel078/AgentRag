const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    originalFileName: {
      type: String,
      required: true
    },

    uploadDate: {
      type: Date,
      default: Date.now
    },

    totalPages: {
      type: Number
    },

    totalChunks: {
      type: Number
    },

    processingStatus: {
      type: String,
      enum: ["uploaded", "processing", "completed", "failed"],
      default: "uploaded"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Book", bookSchema);