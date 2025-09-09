import { Card } from "primereact/card";
import { Rating } from "primereact/rating";

interface ProductReviewCardProps {
  id: string;
  rating: number;
  comment: string;
  user: {
    id: string;
    name: string;
  };
  createdAt: string;
}

const ProductReviewCard = ({
  rating,
  comment,
  user,
  createdAt,
}: ProductReviewCardProps) => {
  const cardHeader = (
    <div className="flex justify-between items-center p-4">
      <h4 className="m-0 font-bold">{user.name}</h4>
      {rating && <Rating value={rating} readOnly cancel={false} />}
    </div>
  );

  return (
    <Card header={cardHeader} className="w-full shadow-md rounded-lg p-3 my-4">
      <p className="m-0 text-start">{comment}</p>
      <div className="flex justify-end mt-2">
        <small className="text-gray-500">
          Published on: {new Date(createdAt).toLocaleDateString()}
        </small>
      </div>
    </Card>
  );
};

export default ProductReviewCard;
