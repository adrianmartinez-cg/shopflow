import { Router } from "express";
import ProductController from "../controller/product.js";
import { uploadHandler } from "../config/uploadConfig.js";

const router = Router();
router.post("/product", uploadHandler, ProductController.registerProduct);
export default router;
