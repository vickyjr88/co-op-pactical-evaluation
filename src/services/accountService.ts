import db from "../config/database";

const debit = async (amount: number, accountId: string) => {
  db.get(`SELECT * FROM users WHERE id = ?`, [1], function (err, row: any) {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log(row);
    const currentAmount = Number(row.balance) - amount;
    db.run(
      `UPDATE users SET balance = ? WHERE id = ?`,
      [currentAmount, accountId],
      function (err) {
        if (err) {
          console.error(err.message);
        } else {
          console.log(`Debited ${amount} from account ${accountId}`);
        }
      }
    );
  });
};

const credit = async (amount: number, accountId: string) => {
  db.get(`SELECT * FROM users WHERE id = ?`, [1], function (err, row: any) {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log(row);
    const currentAmount = Number(row.balance) + amount;
    db.run(
      `UPDATE users SET balance = ? WHERE id = ?`,
      [currentAmount, accountId],
      function (err) {
        if (err) {
          console.error(err.message);
        } else {
          console.log(`Debited ${amount} from account ${accountId}`);
        }
      }
    );
  });
};

export { debit, credit };
