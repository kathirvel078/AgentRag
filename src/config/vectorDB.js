const { ChromaClient } = require("chromadb");

const client = new ChromaClient({
  path: "http://localhost:8000"
});

const COLLECTION_NAME = "bookmind_collection_v2";

const getOrCreateCollection = async () => {
  try {
    const collection = await client.getOrCreateCollection({
      name: COLLECTION_NAME
    });

    console.log("ChromaDB Collection Ready");

    return collection;
  } catch (error) {
    console.error("Vector DB Connection Failed:", error.message);
    throw error;
  }
};

module.exports = {
  getOrCreateCollection
};