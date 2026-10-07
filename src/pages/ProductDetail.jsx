import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import {
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
} from '../store/productsApi';
import { FaCheckCircle } from 'react-icons/fa';
import { FiChevronRight } from 'react-icons/fi';
import TopBanner from '../components/TopBanner';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import ProductGallery from '../components/ProductGallery';
import ProductInfo from '../components/ProductInfo';
import { COLORS } from '../components/productOptions';
import ProductTabs from '../components/ProductTabs';
import ProductSpecifications from '../components/ProductSpecifications';
import ProductReviews from '../components/ProductReviews';
import ProductFaqs from '../components/ProductFaqs';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import ProductReviewModal from '../components/ProductReviewModal';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productQuery = useGetProductByIdQuery(id);
  const product = productQuery.currentData;
  const productError = productQuery.error?.data?.message
    || productQuery.error?.error
    || 'Failed to load product details';
  const loading = !product && productQuery.isFetching;

  // Gallery state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [selectedSize, setSelectedSize] = useState('Large');
  const [quantity, setQuantity] = useState(1);

  // Tabs state
  const [activeTab, setActiveTab] = useState('reviews');

  // User-submitted custom reviews
  const [customReviews, setCustomReviews] = useState([]);
  const [reviewSort, setReviewSort] = useState('latest');
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(6);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [newReviewForm, setNewReviewForm] = useState({
    name: '',
    rating: 5,
    comment: '',
  });

  const relatedProductsQuery = useGetProductsByCategoryQuery(product?.category, {
    skip: !product?.category,
  });
  const relatedProducts = (relatedProductsQuery.currentData || [])
    .filter((relatedProduct) => String(relatedProduct.id) !== String(product?.id))
    .slice(0, 4);

  // Toast feedback
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Derive images
  const productImages = product?.images || [];
  const activeImage = productImages[selectedImageIndex] || productImages[0];

  const apiReviews = product?.formattedReviews || [];
  const reviews = [...customReviews, ...apiReviews];

  // Reset state during render if ID changes
  const [prevId, setPrevId] = useState(id);
  if (prevId !== id) {
    setPrevId(id);
    setSelectedImageIndex(0);
    setQuantity(1);
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const sortedReviews = [...reviews];
  if (reviewSort === 'highest') {
    sortedReviews.sort((firstReview, secondReview) => secondReview.rating - firstReview.rating);
  } else if (reviewSort === 'lowest') {
    sortedReviews.sort((firstReview, secondReview) => firstReview.rating - secondReview.rating);
  }

  // Handle write review submission
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReviewForm.name.trim() || !newReviewForm.comment.trim()) return;

    const newRev = {
      id: Date.now(),
      reviewerName: newReviewForm.name.trim(),
      rating: Number(newReviewForm.rating),
      verified: true,
      comment: `"${newReviewForm.comment.trim()}"`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }),
    };

    setCustomReviews((prev) => [newRev, ...prev]);
    setIsWriteReviewOpen(false);
    setNewReviewForm({ name: '', rating: 5, comment: '' });
    showToast('Your review has been successfully posted!');
  };

  // Add to cart handler
  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      oldPrice: product.oldPrice || null,
      discountPercentage: product.discountPercentage || null,
      image: activeImage || product.thumbnail,
      color: selectedColor.name,
      size: selectedSize,
      quantity,
    }));
    showToast(`Added ${quantity} × ${product.title} (${selectedSize}, ${selectedColor.name}) to cart!`);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-zinc-200">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-black px-5 py-4 text-sm font-semibold text-white shadow-2xl transition-all">
          <FaCheckCircle className="text-emerald-400 text-lg shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Announcement Banner */}
      <TopBanner />

      {/* Navbar */}
      <Navbar />

      <main className="mx-auto max-w-[1240px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-zinc-500">
          <Link to="/" className="hover:text-black transition">Home</Link>
          <FiChevronRight className="text-xs text-zinc-400" />
          <FiChevronRight className="text-xs text-zinc-400" />
          <span className="font-semibold text-black truncate max-w-[200px] sm:max-w-xs">
            {product?.category || 'Product'}
          </span>
        </nav>

        {loading ? (
          <div className="grid min-h-[50vh] place-items-center">
            <div className="flex flex-col items-center gap-3 text-zinc-500">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-200 border-t-black" />
              <p className="text-sm font-medium">Loading product details...</p>
            </div>
          </div>
        ) : productQuery.isError ? (
          <div className="grid min-h-[50vh] place-items-center text-center">
            <div>
              <p className="text-lg font-semibold text-red-500">{productError}</p>
              <button
                onClick={() => navigate('/')}
                className="mt-4 rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white"
              >
                Back to Home
              </button>
            </div>
          </div>
        ) : !product ? (
          <div className="grid min-h-[50vh] place-items-center text-sm text-zinc-500">
            Product not found.
          </div>
        ) : (
          <>
            {/* Product Showcase Section */}
            <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
              <ProductGallery
                product={product}
                images={productImages}
                activeImage={activeImage}
                selectedImageIndex={selectedImageIndex}
                onSelectImage={setSelectedImageIndex}
              />

              <ProductInfo
                product={product}
                selectedColor={selectedColor}
                setSelectedColor={setSelectedColor}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                quantity={quantity}
                setQuantity={setQuantity}
                onAddToCart={handleAddToCart}
              />
            </section>

            <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab}>
              {/* Tab Content */}
              <div className="pt-8">
                {activeTab === 'details' && <ProductSpecifications product={product} />}

                {activeTab === 'reviews' && (
                  <ProductReviews
                    reviews={reviews}
                    sortedReviews={sortedReviews}
                    reviewSort={reviewSort}
                    setReviewSort={setReviewSort}
                    visibleReviewsCount={visibleReviewsCount}
                    setVisibleReviewsCount={setVisibleReviewsCount}
                    onWriteReview={() => setIsWriteReviewOpen(true)}
                  />
                )}

                {activeTab === 'faqs' && <ProductFaqs />}
              </div>
            </ProductTabs>

            {/* "YOU MIGHT ALSO LIKE" Section */}
            {relatedProducts.length > 0 && <section className="mt-16 sm:mt-24 border-t border-zinc-100 pt-14 sm:pt-20">
              <h2 className="text-center text-3xl sm:text-4xl font-black uppercase tracking-tight">
                YOU MIGHT ALSO LIKE
              </h2>

              <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-4 sm:gap-6">
                {relatedProducts.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </section>}
          </>
        )}
      </main>

      {/* Write a Review Modal Dialog */}
      <ProductReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        onSubmit={handleReviewSubmit}
        reviewForm={newReviewForm}
        setReviewForm={setNewReviewForm}
      />

      {/* Newsletter */}
      <div className="mt-16 sm:mt-24">
        <Newsletter />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ProductDetail;
