import { FaStar } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

function ProductReviewModal({ isOpen, onClose, onSubmit, reviewForm, setReviewForm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-lg rounded-[24px] bg-white p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-1 text-zinc-400 hover:text-black transition"
          aria-label="Close modal"
        >
          <FiX className="text-xl" />
        </button>

        <h3 className="text-2xl font-black text-black">Write a Review</h3>
        <p className="mt-1 text-sm text-zinc-500">
          Share your thoughts and experience with other shoppers.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600">
              Your Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Samantha D."
              value={reviewForm.name}
              onChange={(event) => setReviewForm({ ...reviewForm, name: event.target.value })}
              className="mt-1.5 w-full rounded-xl border border-zinc-200 px-4 py-2.5 text-sm outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600">
              Overall Rating
            </label>
            <div className="mt-2 flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                  className="cursor-pointer text-2xl transition hover:scale-110"
                >
                  <FaStar className={star <= reviewForm.rating ? 'text-amber-400' : 'text-zinc-200'} />
                </button>
              ))}
              <span className="ml-2 text-sm font-semibold text-zinc-600">
                {reviewForm.rating} / 5 Stars
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600">
              Your Review
            </label>
            <textarea
              required
              rows={4}
              placeholder="What did you like or dislike about this product? How was the fit and material?"
              value={reviewForm.comment}
              onChange={(event) => setReviewForm({ ...reviewForm, comment: event.target.value })}
              className="mt-1.5 w-full rounded-xl border border-zinc-200 p-4 text-sm outline-none focus:border-black"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-5 py-2.5 text-sm font-semibold text-zinc-600 hover:bg-zinc-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 shadow-sm"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductReviewModal;