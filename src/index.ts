import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { authRoutes } from "./routes/authRoutes";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 5196;
app.listen(PORT, () => {
  console.log(`Auth service running on port ${PORT}`);
});
