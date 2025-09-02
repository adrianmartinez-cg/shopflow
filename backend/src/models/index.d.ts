// src/models/index.d.ts

import { Sequelize, ModelCtor } from 'sequelize';
import { Product } from './product';
import { ProductImage } from './productImage';
import { ProductReview } from './productReview';

export interface DB {
    sequelize: Sequelize;
    Sequelize: typeof Sequelize;
    Product: ModelCtor<Product>;
    ProductImage: ModelCtor<ProductImage>;
    ProductReview: ModelCtor<ProductReview>;
}

declare const db: DB;
export default db;