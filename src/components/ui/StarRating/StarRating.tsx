import { Star } from "lucide-react";

interface PropTypes {
  rating: number;
}

const StarRating = (props: PropTypes) => {
  const { rating } = props;

  const totalStars = 5;
  return (
    <div className="flex items-center space-x-1">
      {[...Array(totalStars)].map((_, i) => (
        <Star
          key={i}
          size={18}
          className={
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }
        />
      ))}
    </div>
  );
};

export default StarRating;
