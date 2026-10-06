import { FaCheckCircle, FaEllipsisH } from 'react-icons/fa';
import { FiChevronDown, FiSliders } from 'react-icons/fi';
import StarRating from './StarRating';

function ProductReviews({
  reviews,
  sortedReviews,
  reviewSort,
  setReviewSort,
  visibleReviewsCount,
  setVisibleReviewsCount,
  onWriteReview,
}) {
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-baseline gap-2">
          <h3 className="text-xl sm:text-2xl font-black">All Reviews</h3>
          <span className="text-sm text-zinc-500 font-medium">({reviews.length})</span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => setReviewSort((sort) => (sort === 'highest' ? 'lowest' : 'highest'))}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F0F0F0] text-black hover:bg-zinc-200 transition cursor-pointer"
            aria-label="Filter reviews"
            title="Toggle Highest / Lowest"
          >
            <FiSliders className="text-lg" />
          </button>

          <div className="relative">
            <select
              value={reviewSort}
              onChange={(event) => setReviewSort(event.target.value)}
              className="h-11 appearance-none rounded-full bg-[#F0F0F0] pl-5 pr-10 text-sm font-semibold text-black outline-none cursor-pointer hover:bg-zinc-200 transition"
            >
              <option value="latest">Latest</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
            <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-black" />
          </div>

          <button
            onClick={onWriteReview}
            className="rounded-full bg-black px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-zinc-800 cursor-pointer shadow-sm"
          >
            Write a Review
          </button>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
        {sortedReviews.slice(0, visibleReviewsCount).map((review) => (
          <article
            key={review.id}
            className="flex flex-col justify-between rounded-[20px] border border-zinc-200 p-6 sm:p-7 bg-white transition hover:border-zinc-300"
          >
            <div>
              <div className="flex items-center justify-between">
                <StarRating rating={review.rating} />
                <button
                  aria-label="Review options"
                  className="text-zinc-400 hover:text-black transition p-1"
                >
                  <FaEllipsisH className="text-sm" />
                </button>
              </div>

              <div className="mt-3 flex items-center gap-1.5">
                <span className="font-bold text-base text-black">{review.reviewerName}</span>
                <FaCheckCircle className="text-emerald-500 text-sm" title="Verified Buyer" />
              </div>

              <p className="mt-3 text-sm leading-relaxed text-zinc-600">{review.comment}</p>
            </div>

            <div className="mt-5 text-xs font-medium text-zinc-400">Posted on {review.date}</div>
          </article>
        ))}
      </div>

      {visibleReviewsCount < sortedReviews.length && (
        <div className="mt-9 text-center">
          <button
            onClick={() => setVisibleReviewsCount((count) => count + 4)}
            className="rounded-full border border-zinc-200 px-9 py-3 text-sm font-semibold text-black transition hover:bg-zinc-50 active:scale-[0.99] cursor-pointer"
          >
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductReviews;