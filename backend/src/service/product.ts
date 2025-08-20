import { sequelize } from '../config/sequelize';
import { Product } from '../model/product';
import { ProductImage } from '../model/productImage';
import fs from 'fs/promises';
import { DEFAULT_HOST } from '../server';

class ProductService {
    static getProducts = async (): Promise<Product[]> => {
        return await Product.findAll();
    };
    static registerProduct = async (
        name: string,
        price: number,
        description?: string,
        imageFiles?: Express.Multer.File[]
    ) => {
        const transaction = await sequelize.transaction();
        try {
            const product = await Product.create(
                { name, description, price },
                { transaction }
            );

            let images: ProductImage[] = [];

            if (imageFiles && imageFiles.length > 0) {
                images = await Promise.all(
                    imageFiles.map(async (file) => {
                        const imageUrl = `${process.env.SERVER_HOST ?? DEFAULT_HOST}/uploads/${file.filename}`;
                        return await ProductImage.create(
                            { url: imageUrl, productId: product.id },
                            { transaction }
                        );
                    })
                );
            }

            await transaction.commit();
            return images.length > 0 ? { product, images } : { product };
        } catch (error) {
            await transaction.rollback();
            if (imageFiles) {
                await Promise.all(imageFiles.map(file => fs.unlink(file.path)))
            }
            throw error;
        }
    }
}

export default ProductService;