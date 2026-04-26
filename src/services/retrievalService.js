const { generateEmbedding } = require("./embeddingService");
const { getOrCreateCollection } = require("../config/vectorDB");

const storeChunksInVectorDB = async (bookId, chunks) => {
  try {
    const collection = await getOrCreateCollection();

    const ids = [];
    const documents = [];
    const metadatas = [];
    const embeddings = [];

    for (let index = 0; index < chunks.length; index++) {
      const chunk = chunks[index];

      if (!chunk.content || !chunk.content.trim()) {
        console.log("Skipping empty chunk");
        continue;
      }

      const embedding = await generateEmbedding(chunk.content);

      if (!embedding || !Array.isArray(embedding)) {
        console.log("Invalid embedding for chunk:", index + 1);
        continue;
      }

      ids.push(`${bookId}-${index + 1}`);
      documents.push(chunk.content);
      embeddings.push(embedding);

      metadatas.push({
        bookId: String(bookId),
        chunkNumber: index + 1,
        source: "technical_book"
      });

      console.log(`Chunk ${index + 1} added`);
    }

    console.log("IDs:", ids.length);
    console.log("Docs:", documents.length);
    console.log("Embeddings:", embeddings.length);
    console.log("Metadatas:", metadatas.length);

    await collection.add({
      ids,
      documents,
      embeddings,
      metadatas
    });

    console.log("Stored successfully in ChromaDB");

    return true;
  } catch (error) {
    console.error("REAL CHROMA ERROR:", error);
    throw new Error("Failed to store chunks in Vector DB");
  }
};


const retrieveRelevantChunks = async (bookId, question, topK = 5) => {
  try {
    const collection = await getOrCreateCollection();

    /*
    Generate query embedding
    */
    const queryEmbedding = await generateEmbedding(question);
     console.log("Searching for bookId:", bookId);

    /*
    Semantic Search
    */
    const results = await collection.query({
      queryEmbeddings: [queryEmbedding],
      nResults: topK,
      where: {
        bookId: {
          $eq: String(bookId)
        }
      }
    });
     console.log("Query Results:", results);

     if (
      !results.documents ||
      !results.documents.length ||
      !results.documents[0].length
    ) {
      return [];
    }

    const chunks = results.documents[0].map((doc, index) => ({
      chunkNumber: index + 1,
      content: doc
    }));

    return chunks;
  } catch (error) {
    throw new Error("Retrieval failed");
  }
};

module.exports = {
  storeChunksInVectorDB,
  retrieveRelevantChunks
};









// const storeChunksInVectorDB = async (bookId, chunks) => {
//   try {
//     const collection = await getOrCreateCollection();

//     const ids = [];
//     const documents = [];
//     const metadatas = [];
//     const embeddings = [];

//     for (const chunk of chunks) {
//       ids.push(`${bookId}-${chunk.chunkId}`);
//       documents.push(chunk.content);

//       metadatas.push({
//         bookId: String(bookId),
//         chunkNumber: chunk.chunkId,
//         source: "technical_book"
//       });
//     }

//     await collection.add({
//       ids,
//       documents,
//       embeddings,
//       metadatas
//     });
//     console.log("Chunks stored successfully");

//     return true;
//   } catch (error) {
//     console.error("REAL ERROR:", error);
//     throw new Error("Failed to store chunks in Vector DB");
//   }
// };