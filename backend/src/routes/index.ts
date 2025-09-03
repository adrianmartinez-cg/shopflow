import { Router } from "express";
import UserController from "../controller/user.js";
import { AuthController } from "../controller/auth.js";
import ProductController from "../controller/product.js";

const router = Router();

router.get("/users", UserController.getUsers);
router.post("/register", UserController.registerUser);
router.post("/login", AuthController.login);
router.get("/product/:id", ProductController.getProductById);

export default router;
