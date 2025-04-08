import { Star } from "lucide-react";

interface PropTypes {
  rating: number;
  setRating: (s: number) => void;
}
const StarSelector = (props: PropTypes) => {
  const { rating, setRating } = props;
  return (
    <div className="mb-2 flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={24}
          onClick={() => setRating(i + 1)}
          className={`cursor-pointer ${
            i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default StarSelector;
