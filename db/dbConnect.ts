import mongoose from "mongoose";

/** 
Source : 
https://itnext.io/using-mongoose-with-next-js-11-b2a08ff2dd3c
https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/utils/dbConnect.js 
**/

const MONGODB_URI: string = process.env.MONGODB_DATABASE_URI || "";

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
// type cachedType = {
//   conn: any;
//   promise: any;
// };

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
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      //   bufferMaxEntries: 0,
      //   useFindAndModify: true,
      //   useCreateIndex: true,
    };

    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  console.log("-- MongoDB connected!");

  return cached.conn;
}

export default dbConnect;
