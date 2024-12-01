import {Router} from "express";
import { getUserInfo, signup } from "../controllers/AuthController.js";
import { login } from "../controllers/AuthController.js";
import { verifyToken } from "../middleware/AuthMiddleware.js";

const authRoutes = Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/user-info",verifyToken, getUserInfo);

export default authRoutes;  
