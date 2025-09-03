import { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { Galleria } from 'primereact/galleria';
import { API_URL } from '../../../constants/globals';
import { SERVER_ERROR_MSG } from '../../../constants/errors';
import { useParams } from 'react-router-dom';

interface ProductImage {
    id: string;
    url: string;
    productId: string;
    createdAt: string;
    updatedAt: string;
}

interface ProductReview {
    id: string;
    rating: number;
    comment: string;
    userId: string;
    productId: string;
    createdAt: string;
    updatedAt: string;
}

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    tags: string;
    createdAt: string;
    updatedAt: string;
    images: ProductImage[];
    reviews: ProductReview[];
}

const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchProduct = async () => {
        try {
            const response = await fetch(`${API_URL}/product/${id}`);
            if (!response.ok) {
                throw new Error('Error while searching for product');
            }
            const data: Product = await response.json();
            const productData = {
                ...data,
                price: Number(data.price),
            };
        
            setProduct(productData);
        } catch (error) {
            console.error(SERVER_ERROR_MSG);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (loading) {
        return <div>Loading product...</div>;
    }

    if (!product) {
        return <div>Product not found.</div>;
    }

    const itemTemplate = (item: ProductImage) => {
        return <img src={item.url} alt={product.name} style={{ width: '100%', display: 'block' }} />;
    };

    const thumbnailTemplate = (item: ProductImage) => {
        return <img src={item.url} alt={product.name} style={{ width: '100%', display: 'block' }} />;
    };

    return (
        <div className="p-grid p-justify-center p-mt-5">
            <div className="p-col-12 p-md-8">
                <Card title={product.name} className="p-shadow-3">
                    <div className="p-d-flex p-flex-column p-md-flex-row">
                        <div className="p-mb-3 p-md-mb-0 p-md-mr-3">
                            <Galleria
                                value={product.images}
                                numVisible={5}
                                circular
                                showItemNavigators
                                showThumbnails
                                item={itemTemplate}
                                thumbnail={thumbnailTemplate}
                                style={{ maxWidth: '640px' }}
                            />
                        </div>
                        <div className="p-flex-grow-1">
                            <h3>Description</h3>
                            <p>{product.description}</p>
                            <h3>Price</h3>
                            <p>R$ {product.price.toFixed(2)}</p>
                            <h3>Tags</h3>
                            <p>{product.tags}</p>
                            <h3>Dates</h3>
                            <p>Created at: {new Date(product.createdAt).toLocaleDateString()}</p>
                            <p>Updated at: {new Date(product.updatedAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ProductPage;