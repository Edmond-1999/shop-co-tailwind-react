import { useState } from 'react';
import ProductTabs from './ProductTabs';
import ProductSpecifications from './ProductSpecifications';
import ProductReviews from './ProductReviews';
import ProductReviewModal from './ProductReviewModal';

function ProductReviewSection({ product }) {
  const [activeTab, setActiveTab] = useState('reviews');
  const [customReviews, setCustomReviews] = useState([]);
  const [reviewSort, setReviewSort] = useState('latest');
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(6);
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [newReviewForm, setNewReviewForm] = useState({
    name: '',
    rating: 5,
    comment: '',
  });

  const reviews = [...customReviews, ...(product?.formattedReviews || [])];
  const sortedReviews = [...reviews];
  if (reviewSort === 'highest') {
    sortedReviews.sort((firstReview, secondReview) => secondReview.rating - firstReview.rating);
  } else if (reviewSort === 'lowest') {
    sortedReviews.sort((firstReview, secondReview) => firstReview.rating - secondReview.rating);
  }

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    if (!newReviewForm.name.trim() || !newReviewForm.comment.trim()) return;

    const newReview = {
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

    setCustomReviews((previousReviews) => [newReview, ...previousReviews]);
    setIsWriteReviewOpen(false);
    setNewReviewForm({ name: '', rating: 5, comment: '' });
  };

  return (
    <>
      {product && (
        <ProductTabs activeTab={activeTab} setActiveTab={setActiveTab}>
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
          </div>
        </ProductTabs>
      )}

      <ProductReviewModal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        onSubmit={handleReviewSubmit}
        reviewForm={newReviewForm}
        setReviewForm={setNewReviewForm}
      />
    </>
  );
}

export default ProductReviewSection;
