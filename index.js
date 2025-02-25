import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.js"
import BoardRouter from "./routes/board.js"
import ListRouter from "./routes/list.js"
import dotenv from "dotenv";
dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server started successfully");
});

app.use("/auth", authRoute);
app.use("/board",BoardRouter);
app.use("/list",ListRouter);

const startServer = async () => {
  try {
    await connectDB(process.env.Database_URL);
    app.listen(8080, () => console.log("Server started"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
