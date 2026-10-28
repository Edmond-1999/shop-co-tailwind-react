import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';

function ProductPurchaseSection({ product }) {
  const dispatch = useDispatch();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [previousProductId, setPreviousProductId] = useState(product?.id);

  if (product && previousProductId !== product.id) {
    setPreviousProductId(product.id);
    setSelectedImageIndex(0);
    setQuantity(1);
  }

  if (!product) return null;

  const activeImage = product.images[selectedImageIndex] || product.images[0];

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      oldPrice: product.oldPrice || null,
      discountPercentage: product.discountPercentage || null,
      image: activeImage || product.thumbnail,
      quantity,
    }));
  };

  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
      <ProductGallery
        product={product}
        images={product.images}
        activeImage={activeImage}
        selectedImageIndex={selectedImageIndex}
        onSelectImage={setSelectedImageIndex}
      />
      <ProductInfo
        product={product}
        quantity={quantity}
        setQuantity={setQuantity}
        onAddToCart={handleAddToCart}
      />
    </section>
  );
}

export default ProductPurchaseSection;
