import db from "../config/database";
import { credit } from "./accountService";
import fs from "fs";
import { createLogger, format, transports } from "winston";
import path from "path";
// Define the log file path
const logFilePath = path.join(__dirname, "app.log");

// Function to write logs to the file
function logToFile(message: string) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${message}\n`;

  fs.appendFile(logFilePath, logMessage, (err: any) => {
    if (err) {
      console.error("Failed to write to log file:", err);
    }
  });
}

const createTopUpTransaction = async (
  userId: string,
  amount: number,
  category: string
) => {
  const date = new Date().toISOString();
  const type = "income";
  db.run(
    `INSERT INTO transactions (userId, amount, category, type, date) VALUES (?, ?, ?, ?, ?)`,
    [userId, amount, category, type, date],

    function (err) {
      if (err) {
        console.error(err.message);
      } else {
        logToFile(`Credited ${amount} to account ${userId}`);
        credit(amount, userId);
      }
    }
  );
};

export { createTopUpTransaction };
