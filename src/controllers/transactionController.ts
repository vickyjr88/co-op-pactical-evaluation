import { Request, Response } from "express";
import db from "../config/database";
import { credit, debit } from "../services/accountService";

const newTransaction = (req: Request, res: Response) => {
  const { amount, category, type } = req.body;
  const userId = req.body.userId;
  const date = new Date().toISOString();

  db.run(
    `INSERT INTO transactions (userId, amount, category, type, date) VALUES (?, ?, ?, ?, ?)`,
    [userId, amount, category, type, date],
    function (err) {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        if (type === "expense") {
          debit(amount, userId);
        } else {
          credit(amount, userId);
        }
        res.status(201).json({ id: this.lastID });
      }
    }
  );
};

const fetchTransactions = (req: Request, res: Response) => {
  const userId = req.body.userId;

  db.all(
    `SELECT * FROM transactions WHERE userId = ?`,
    [userId],
    (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(200).json(rows);
      }
    }
  );
};

export { newTransaction, fetchTransactions };
