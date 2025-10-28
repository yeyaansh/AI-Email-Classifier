import express from "express";
import { googleLoginController, loginController } from "../controllers/authControllers.js";

const authRouter = express.Router();

authRouter.get("/test", loginController);
authRouter.post("/google/login", googleLoginController);

export default authRouter;
