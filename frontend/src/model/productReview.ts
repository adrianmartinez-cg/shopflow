export interface ProductReview {
    id: string;
    rating: number;
    comment: string;
    userId: string;
    user: {
        id: string;
        name: string;
        email: string;
    }
    productId: string;
    createdAt: string;
    updatedAt: string;
}