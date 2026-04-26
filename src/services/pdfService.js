const fs = require("fs");
const pdfParse = require("pdf-parse");



const extractTextFromPDF = async (filePath) => {
  try {
    console.log("File Path:",filePath)
    console.log("File Exists:",fs.existsSync(filePath))
    const dataBuffer = fs.readFileSync(filePath);

    const pdfData = await pdfParse(dataBuffer);

    return {
      text: pdfData.text,
      totalPages: pdfData.numpages,
      info: pdfData.info
    };
  } catch (error) {
    console.error("PDF PArser ERROR  => :", error.message); // VERY IMPORTANT
    console.log(error.stack);
    throw error;
  }
};

module.exports = {
  extractTextFromPDF
};