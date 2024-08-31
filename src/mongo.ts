// lib/mongodb.ts
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://rishikeshkeshari:DANTEnero@cluster0.u8xxwyf.mongodb.net/"
const client = new MongoClient(uri);

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to ensure the connection is reused
  let globalClient = (global as any)._mongoClient;
  if (!globalClient) {
    globalClient = (global as any)._mongoClient = client.connect();
  }
  clientPromise = globalClient;
} else {
  // In production mode, create a new client for each request
  clientPromise = client.connect();
}

export default clientPromise;
