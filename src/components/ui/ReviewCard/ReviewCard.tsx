import { User } from "lucide-react";
import StarRating from "../StarRating";

interface PropTypes {
  name: string;
  rating: number;
  comment: string;
}

const ReviewCard = (props: PropTypes) => {
  const { name, rating, comment } = props;
  return (
    <div className="flex items-start space-x-4 rounded-2xl bg-white p-4 shadow">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-950/20 text-yellow-950">
        <User size={24} />
      </div>
      <div>
        <StarRating rating={rating} />
        <p className="mt-1 text-sm text-gray-700">{comment}</p>
        <p className="mt-2 text-sm font-semibold text-gray-900">{name}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
