import mongoose from "mongoose";

const MONGODB_URI = 'mongodb+srv://uspupils:UreEU4rUrHhYu0hQ@uspupils.sqreq.mongodb.net/'; // Add your MongoDB URI in .env.local

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

/** Ensure the connection is cached to avoid multiple reconnections in development */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
