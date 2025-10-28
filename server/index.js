import express from "express";
import "dotenv/config";
import cors from "cors";
import authRouter from "./src/routes/authRouter.js";
import mongo_database_connect from "./src/config/mongodb_connect.js";
import emailRouter from "./src/routes/emailRouter.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // This is crucial!
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  })
);
// app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({
    message: "Hello We Welcome You From Auth Server...",
    success: true,
  });
});

app.use("/auth", authRouter);
app.use("/email", emailRouter);

async function connect_servers() {
  await mongo_database_connect();

  app.listen(PORT, () => {
    console.log(`Server is listening at Port Number: ${PORT}`);
  });
}
connect_servers();
