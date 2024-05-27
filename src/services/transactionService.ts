import db from "../config/database";
import { credit } from "./accountService";

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
        credit(amount, userId);
      }
    }
  );
};

export { createTopUpTransaction };
