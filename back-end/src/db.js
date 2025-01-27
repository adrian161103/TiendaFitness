import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";


export const conectDB = async () => {
  try {
     await mongoose.connect(MONGODB_URI);
    console.log(`dataBase connected`);
  } catch (error) {
    console.error(`Error connecting to database`, Error);

    process.exit(1);
  }
};


conectDB();

