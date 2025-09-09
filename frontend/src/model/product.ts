import type { ProductImage } from "./productImage";
import type { ProductReview } from "./productReview";

export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    tags?: string;
    createdAt: string;
    updatedAt: string;
    images?: ProductImage[];
    reviews?: ProductReview[];
}