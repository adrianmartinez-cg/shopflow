import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();
export const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.SHOPFLOW_DB_USER,
  password: process.env.SHOPFLOW_DB_PASSWORD,
  database: process.env.SHOPFLOW_DB,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to server:", err);
    return;
  }
  console.log("Connected to server");
});
