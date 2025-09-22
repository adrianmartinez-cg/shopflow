import { useState, useEffect } from "react";
import { Galleria } from "primereact/galleria";
import { API_URL } from "../../../constants/globals";
import { SERVER_ERROR_MSG } from "../../../constants/errors";
import { useParams } from "react-router-dom";
import type { Product } from "../../../model/product";
import TagsChips from "./components/TagsChips";
import ProductReviewCard from "./components/ProductReviewCard";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${API_URL}/product/${id}`);
      if (!response.ok) {
        throw new Error("Error while searching for product");
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

  return (
    <div className="flex-flex-col w-screen justify-center items-center">
      <div className="w-full p-8 h-[800px]">
        <div className="flex flex-row justify-between items-start h-full w-full gap-x-8">
          <div className="flex flex-col justify-start items-start gap-y-8 w-1/2 h-full rounded-lg p-2 border border-solid border-slate-800 shadow-md bg-white">
            <div className="flex flex-col gap-y-3 items-start rounded-lg grow w-full">
              <h2 className="font-black">{product.name}</h2>
              <div className="bg-gray-100 grow rounded-lg p-5 w-full">
                <p className="text-start">{product.description}</p>
              </div>
            </div>
            <div className="flex flex-col gap-y-3 items-start">
              <h3 className="font-black">Price</h3>
              <p className="text-start">R$ {product.price.toFixed(2)}</p>
            </div>
            {product.tags && (
              <div className="flex flex-col gap-y-3 items-start">
                <h3 className="font-black">Tags</h3>
                <TagsChips tags={product.tags} />
              </div>
            )}
            <div className="flex flex-col gap-y-3 items-start">
              <p>
                <strong>Published in:</strong>{" "}
                {new Date(product.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>Last update: </strong>{" "}
                {new Date(product.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Galleria
            className="p-lara-dark-teal w-1/2"
            value={product.images}
            numVisible={5}
            circular
            showItemNavigators
            itemNextIcon={
              <i className="pi pi-angle-right" style={{ color: "black" }}></i>
            }
            itemPrevIcon={
              <i className="pi pi-angle-left" style={{ color: "black" }}></i>
            }
            item={(item) => (
              <img
                src={item.url}
                alt={product.name}
                className="w-full block h-[500px]"
              />
            )}
            thumbnail={(item) => (
              <img
                src={item.url}
                alt={product.name}
                className="w-[300px] block h-[200px]"
              />
            )}
            style={{ width: "640px", height: "640px" }}
          />
        </div>
      </div>
      {product?.reviews && product?.reviews.length > 0 ? (
        <div className="mt-8 w-full p-8">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          <div className="flex flex-col gap-4 items-center">
            {product.reviews.map((review) => (
              <ProductReviewCard
                key={review.id}
                id={review.id}
                rating={review.rating}
                comment={review.comment}
                user={review.user}
                createdAt={review.createdAt}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <p className="text-lg text-gray-500">No reviews yet.</p>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
