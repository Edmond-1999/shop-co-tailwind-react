import { useNavigate } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const rating = Number(product.rating || 4.5);
  const price = Number(product.price || 0);
  const oldPrice = product.discountPercentage
    ? Math.round(price / (1 - product.discountPercentage / 100))
    : null;
  const image = product.thumbnail || product.images?.[0];
  const stars = [1, 2, 3, 4, 5];

  const handleClick = () => {
    navigate(`/product/${product.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <article onClick={handleClick} className="group cursor-pointer">
      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-[#F0EEED] p-3">
        <img
          src={image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain transition duration-300 group-hover:scale-105 mix-blend-multiply"
        />
      </div>
      <div className="pt-3">
        <h3 className="line-clamp-1 text-sm font-bold sm:text-base">{product.title}</h3>
        <div className="mt-1 flex items-center gap-1.5 text-xs sm:text-sm">
          <span className="flex text-amber-400">
            {stars.map((star) => (
              <FaStar
                key={star}
                className={star <= Math.round(rating) ? '' : 'text-zinc-200'}
              />
            ))}
          </span>
          <span className="text-zinc-600 font-medium">{rating.toFixed(1)}/5</span>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <strong className="text-lg sm:text-xl font-black">${price.toFixed(0)}</strong>
          {oldPrice && (
            <>
              <del className="text-sm font-bold text-zinc-400">${oldPrice}</del>
              <span className="rounded-full bg-red-50 px-2.5 py-0.5 text-[11px] font-semibold text-red-500">
                -{Math.round(product.discountPercentage || ((oldPrice - price) / oldPrice) * 100)}%
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
