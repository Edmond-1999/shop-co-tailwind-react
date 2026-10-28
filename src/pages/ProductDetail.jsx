import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import TopBanner from '../components/TopBanner';
import Navbar from '../components/Navbar';
import ProductPurchaseSection from '../components/ProductPurchaseSection';
import ProductReviewSection from '../components/ProductReviewSection';
import ProductToast from '../components/ProductToast';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import useProductDetailData from '../hooks/useProductDetailData';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, error, loading } = useProductDetailData(id);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-zinc-200">
      <ProductToast message={toast} />
      <TopBanner />
      <Navbar />

      <main className="mx-auto max-w-[1240px] px-4 py-6 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-zinc-500">
          <Link to="/" className="transition hover:text-black">Home</Link>
          <FiChevronRight className="text-xs text-zinc-400" />
          <FiChevronRight className="text-xs text-zinc-400" />
          <span className="max-w-[200px] truncate font-semibold text-black sm:max-w-xs">
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
        ) : error ? (
          <div className="grid min-h-[50vh] place-items-center text-center">
            <div>
              <p className="text-lg font-semibold text-red-500">{error}</p>
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
        ) : null}

        <ProductPurchaseSection product={product} onToast={showToast} />
        <ProductReviewSection product={product} onToast={showToast} />
      </main>

      <div className="mt-16 sm:mt-24">
        <Newsletter />
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetail;
