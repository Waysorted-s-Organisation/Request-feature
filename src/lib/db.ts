import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env");
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

global.mongoose ??= cached;

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  cached.promise ??= mongoose.connect(MONGODB_URI!, { bufferCommands: false, dbName: "Website" })
    .then((mongoose) => {
      console.log("Connected to MongoDB");
      return mongoose;
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
      throw err;
    });
  
  cached.conn = await cached.promise;
  return cached.conn;
}
