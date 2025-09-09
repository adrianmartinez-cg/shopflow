import { sequelize } from "../config/sequelize.js";
import fs from "fs/promises";
import { DEFAULT_HOST } from "../server.js";
import db from "../models/index.js";

import { Product } from "../models/product.js";
import { ProductImage } from "../models/productImage.js";
import { ProductReview } from "../models/productReview.js";
import { User } from "../models/user.js";

const {
  Product: ProductModel,
  ProductImage: ProductImageModel,
  ProductReview: ProductReviewModel,
} = db;

class ProductService {
  static getProducts = async (): Promise<Product[]> => {
    return await ProductModel.findAll();
  };
  static registerProduct = async (
    name: string,
    price: number,
    description?: string,
    imageFiles?: Express.Multer.File[],
  ) => {
    const transaction = await sequelize.transaction();
    try {
      const product = await ProductModel.create(
        { name, description, price },
        { transaction },
      );

      let images: ProductImage[] = [];

      if (imageFiles && imageFiles.length > 0) {
        images = await Promise.all(
          imageFiles.map(async (file) => {
            const imageUrl = `${process.env.SERVER_HOST ?? DEFAULT_HOST}/uploads/${file.filename}`;
            return await ProductImageModel.create(
              { url: imageUrl, productId: product.id },
              { transaction },
            );
          }),
        );
      }

      await transaction.commit();
      return images.length > 0 ? { product, images } : { product };
    } catch (error) {
      await transaction.rollback();
      if (imageFiles) {
        await Promise.all(imageFiles.map((file) => fs.unlink(file.path)));
      }
      throw error;
    }
  };
  static getProductById = async (id: string): Promise<Product | null> => {
    const product = await Product.findByPk(id, {
      include: [
        {
          model: ProductImage,
          as: "images",
        },
        {
          model: ProductReview,
          as: "reviews",
          include: [
            {
              model: User,
              as: "user",
              attributes: ["id", "name", "email"],
            },
          ],
        },
      ],
    });
    return product;
  };
}

export default ProductService;
