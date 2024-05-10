import { configDotenv } from "dotenv";

if(process.env.NODE_ENV!=='production'){
    configDotenv();
}

export const PORT = 5173
export const MONGODB_URL = process.env.MONGODB_URL;