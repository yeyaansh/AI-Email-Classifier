import express from "express";
import userMiddleware from "../middleware/userMiddleware.js";
import { emailMessagesController } from "../controllers/emailControllers.js";
import aiEmailClassifier from "../gemini/index.js";

const emailRouter = express.Router();

emailRouter.get("/messages", userMiddleware, emailMessagesController);
emailRouter.post("/ai", userMiddleware, aiEmailClassifier);
export default emailRouter;
