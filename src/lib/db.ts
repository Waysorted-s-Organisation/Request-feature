import mongoose, { Mongoose } from "mongoose";

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env");
}

interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Extend the global object to include mongoose cache
declare global {
  var mongoose: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };

global.mongoose ??= cached;

export async function connectDB(): Promise<Mongoose> {
  if (cached.conn) return cached.conn;

  cached.promise ??= mongoose.connect(MONGODB_URI!, { bufferCommands: false, dbName: "Website" })
      .then((mongoose: Mongoose) => {
        console.log("Connected to MongoDB");
        return mongoose;
      })
      .catch((err: Error) => {
        console.error("MongoDB connection error:", err);
        throw err;
      });
  
  cached.conn = await cached.promise;
  return cached.conn;
}
