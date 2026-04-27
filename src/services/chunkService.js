const { RecursiveCharacterTextSplitter } = require("@langchain/textsplitters");

const splitTextIntoChunks = async (text) => {
  try {
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200
    });

    const chunks = await splitter.createDocuments([text]);

    return chunks.map((chunk, index) => ({
      chunkId: index + 1,
      content: chunk.pageContent,
      metadata: {
        source: "book",
        chunkNumber: index + 1
      }
    }));
  } catch (error) {
    throw new Error("Chunking failed");
  }
};

module.exports = {
  splitTextIntoChunks
};