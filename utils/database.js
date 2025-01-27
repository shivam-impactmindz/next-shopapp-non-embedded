import mongoose from "mongoose";

export const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) return mongoose.connection.asPromise();

  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};


















// import { MongoClient } from "mongodb";

// let client;
// let clientPromise;

// if (!process.env.DATABASE_URL) {
//   throw new Error("Please add your MongoDB URI to the .env file.");
// }

// if (process.env.NODE_ENV === "development") {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(process.env.DATABASE_URL);
//     global._mongoClientPromise = client.connect();
//   }
//   clientPromise = global._mongoClientPromise;
// } else {
//   client = new MongoClient(process.env.DATABASE_URL);
//   clientPromise = client.connect();
// }

// export default clientPromise;
