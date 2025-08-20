import { Request, Response } from 'express';
import { z } from 'zod';
import ProductService from '../service/product';
import { BAD_REQUEST_ERROR, INTERNAL_SERVER_ERROR } from '../constants/globals';

export const productSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().optional(),
  price: z.number().min(0),
});

class ProductController {
  static getProducts = async (req: Request, res: Response) => {
    try {
      const products = await ProductService.getProducts()
      return res.json(products);
    } catch (error) {
      return res.status(500).json({ error: INTERNAL_SERVER_ERROR });
    }
  };
  static registerProduct = async (req: Request, res: Response) => {
    try {
      const parsed = productSchema.safeParse({
        name: req.body.name,
        description: req.body.description,
        price: parseFloat(req.body.price),
      });

      if (!parsed.success) {
        return res.status(400).json({ error: BAD_REQUEST_ERROR });
      }

      const imageFiles = (req.files as Express.Multer.File[]) || [];
      const { name, description, price } = parsed.data;
      const result = await ProductService.registerProduct(name, price, description, imageFiles)

      return res.status(201).json(result);
    } catch (error: any) {
      console.error('Error while registering product:', error);
      return res.status(500).json({ error: INTERNAL_SERVER_ERROR });
    }
  };

}

export default ProductController;
