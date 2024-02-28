import * as dotenv from "dotenv"; dotenv.config();
import mongoose from "mongoose"

// CONNECT TO MONGOOSE

export const connect = () => {

    const MONGO_DB_URI = process.env.MONGO_DB_URI || "mongodb://localhost:27017";

    mongoose.connect(MONGO_DB_URI)
    .then(() =>{
        console.log(`Database connected! 😍`);
    })
    .catch((error) => {
        console.log(`Connection with MongoDB : FAILED ⛔`, error);
    });

    mongoose.connection.on(`error`, () => {
        console.error("Error when connecting to DATA BASE. Database is not connected! ☹️", error);
    })
}