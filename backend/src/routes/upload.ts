import { Router } from 'express';
import ProductController from '../controller/product';
import { uploadHandler } from '../config/uploadConfig';

const router = Router();
router.post('/product', uploadHandler, ProductController.registerProduct);
export default router;