import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

function StarRating({ rating = 5 }) {
  const rounded = Math.round(rating * 2) / 2;
  return (
    <div className="flex items-center gap-1 text-amber-400">
      {[1, 2, 3, 4, 5].map((star) => {
        if (rounded >= star) {
          return <FaStar key={star} className="text-amber-400 text-base" />;
        }
        if (rounded >= star - 0.5) {
          return <FaStarHalfAlt key={star} className="text-amber-400 text-base" />;
        }
        return <FaStar key={star} className="text-zinc-200 text-base" />;
      })}
    </div>
  );
}

export default StarRating;