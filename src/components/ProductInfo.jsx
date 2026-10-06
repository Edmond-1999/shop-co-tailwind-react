import { FiCheck, FiMinus, FiPlus } from 'react-icons/fi';
import StarRating from './StarRating';
import { COLORS, SIZES } from './productOptions';

function ProductInfo({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  onAddToCart,
}) {
  return (
    <div className="flex flex-col justify-between">
      <div>
        <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-black uppercase tracking-tight leading-tight">
          {product.title}
        </h1>

        <div className="mt-3 flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-sm font-semibold text-black">
            {Number(product.rating || 4.5).toFixed(1)}/
            <span className="text-zinc-500 font-normal">5</span>
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-2xl sm:text-3xl font-black text-black">
            ${Math.round(product.price)}
          </span>
          {product.oldPrice && (
            <del className="text-2xl sm:text-3xl font-bold text-zinc-400">
              ${Math.round(product.oldPrice)}
            </del>
          )}
          {product.discountPercentage && (
            <span className="rounded-full bg-red-50 px-3.5 py-1 text-xs sm:text-sm font-bold text-red-500">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </div>

        <p className="mt-4 text-sm sm:text-base leading-relaxed text-zinc-600">
          {product.description}
        </p>

        <hr className="my-6 border-zinc-200" />

        <div>
          <span className="text-sm font-normal text-zinc-500">Select Colors</span>
          <div className="mt-3 flex items-center gap-3">
            {COLORS.map((color) => {
              const isSelected = selectedColor.id === color.id;
              return (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color)}
                  style={{ backgroundColor: color.hex }}
                  aria-label={`Select color ${color.name}`}
                  className={`relative flex h-9 w-9 items-center justify-center rounded-full shadow-sm transition-transform duration-200 hover:scale-110 cursor-pointer ${
                    isSelected ? 'ring-2 ring-black/20 ring-offset-2' : ''
                  }`}
                >
                  {isSelected && <FiCheck className="text-white text-base stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>

        <hr className="my-6 border-zinc-200" />

        <div>
          <span className="text-sm font-normal text-zinc-500">Choose Size</span>
          <div className="mt-3 flex flex-wrap gap-2.5 sm:gap-3">
            {SIZES.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`rounded-full px-5 py-2.5 sm:px-6 sm:py-3 text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-black text-white shadow-sm'
                      : 'bg-[#F0F0F0] text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        <hr className="my-6 border-zinc-200" />

        <div className="flex items-center gap-4">
          <div className="flex w-32 items-center justify-between rounded-full bg-[#F0F0F0] px-4 py-3 sm:w-36 sm:px-5 sm:py-3.5">
            <button
              onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              className="text-lg text-black transition hover:opacity-60 disabled:opacity-30 cursor-pointer"
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <FiMinus />
            </button>
            <span className="text-sm sm:text-base font-bold select-none">{quantity}</span>
            <button
              onClick={() => setQuantity((current) => current + 1)}
              className="text-lg text-black transition hover:opacity-60 cursor-pointer"
              aria-label="Increase quantity"
            >
              <FiPlus />
            </button>
          </div>

          <button
            onClick={onAddToCart}
            className="flex-1 rounded-full bg-black px-6 py-3.5 text-sm sm:py-4 sm:text-base font-semibold text-white shadow-sm transition hover:bg-zinc-800 active:scale-[0.99] cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;