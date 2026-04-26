const Book = require("../models/Book");
const { extractTextFromPDF } = require("../services/pdfService");
const { splitTextIntoChunks } = require("../services/chunkService");
const { storeChunksInVectorDB } = require("../services/retrievalService");

const uploadPDF = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF uploaded",
      });
    } 

    /*
    Extract PDF Text
    */
    const extractedData = await extractTextFromPDF(req.file.path);

    const chunks = await splitTextIntoChunks(extractedData.text);
    /*

    Save Book Metadata
    */
    const newBook = await Book.create({
      title: req.body.title || req.file.originalname,
      originalFileName: req.file.originalname,
      totalPages: extractedData.totalPages,
      totalChunks: chunks.length,
      processingStatus: "processing",
    });

    //store in vector DB
    try{
    await storeChunksInVectorDB(newBook._id, chunks);
    } catch(err){
      console.error("Vector DB Error: ",err);
      return res.status(500).json({
        success:false,
        message:"Vector Storage Failed"
      })
    }

    //response
    newBook.processingStatus = "completed";
    await newBook.save();
    

    res.status(201).json({
      success: true,
      message: "PDF uploaded and chunked successfully",
      totalChunks: chunks.length,
      book: newBook,
      previewChunk: chunks[0],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadPDF,
};
