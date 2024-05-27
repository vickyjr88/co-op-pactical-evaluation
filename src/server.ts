import express, { Application, Request, Response } from "express";
import * as dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import verifyToken from "./middleware/verifyToken";
import {
  fetchUser,
  login,
  signup,
  updateEmail,
  updatePassword,
} from "./controllers/userController";
import {
  fetchTransactions,
  newTransaction,
} from "./controllers/transactionController";

// Load the .env file
dotenv.config();

const app: Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;
const SECRET_KEY: string = process.env.SECRET_KEY || "Secret key."; // Change this to a secure secret key

// app.use(bodyParser.json());
// Parse body if urlencoded or JSON
app.use(express.urlencoded({ extended: true, limit: "25mb" }));
app.use(express.json({ limit: "50mb" }));

// set up morgan middleware
const morganMode = process.env.NODE_ENV === "production" ? "tiny" : "dev";
app.use(morgan(morganMode));
app.use(cookieParser());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Bank APIs.");
});

// User registration and login routes (from previous code)
app.post("/api/register", signup);
app.post("/api/login", login);
app.put("/api/users/:id", verifyToken, updateEmail);
app.put("/api/users/:id/password", verifyToken, updatePassword);

// Get user profile route
app.get("/api/users/:id", verifyToken, fetchUser);

// Add transaction route
app.post("/api/transactions", verifyToken, newTransaction);

// Fetch transactions route
app.get("/api/transactions", verifyToken, fetchTransactions);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
