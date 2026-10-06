function ProductGallery({ product, images, activeImage, selectedImageIndex, onSelectImage }) {
  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      <div className="flex flex-row gap-3 sm:flex-col sm:w-[130px] shrink-0">
        {images.map((image, index) => {
          const isActive = selectedImageIndex === index;
          return (
            <button
              key={index}
              onClick={() => onSelectImage(index)}
              className={`aspect-square w-full overflow-hidden rounded-[18px] bg-[#F0EEED] p-2 transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'border-2 border-black ring-1 ring-black/10'
                  : 'border-2 border-transparent hover:border-zinc-300'
              }`}
              aria-label={`View product image ${index + 1}`}
            >
              <img
                src={image}
                alt={`${product.title} thumbnail ${index + 1}`}
                className="h-full w-full object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105"
                loading="lazy"
              />
            </button>
          );
        })}
      </div>

      <div className="flex aspect-square flex-1 items-center justify-center overflow-hidden rounded-[24px] bg-[#F0EEED] p-6 sm:p-10">
        <img
          src={activeImage || product.thumbnail}
          alt={product.title}
          className="max-h-full max-w-full object-contain mix-blend-multiply transition-all duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
}

export default ProductGallery;