import { useSelector } from 'react-redux';
import ProductCard from './ProductCard';

function TopSelling({ onViewAll }) {
  const { items, status } = useSelector((state) => state.products);
  const products = items.slice(4, 8);

  return (
    <section id="top-selling" className="border-b border-zinc-200 py-14 sm:py-20">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-black tracking-[-1px] sm:text-4xl">TOP SELLING</h2>
        {status === 'loading' && (
          <p className="py-10 text-center text-zinc-500">Loading products...</p>
        )}
        {status === 'failed' && (
          <p className="py-10 text-center text-red-500">Unable to load products.</p>
        )}
        {status === 'succeeded' && (
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        <div className="mt-10 text-center">
          <button
            onClick={onViewAll}
            className="w-full rounded-full border border-zinc-300 px-8 py-3 text-sm font-semibold transition hover:bg-black hover:text-white sm:w-auto"
          >
            View All
          </button>
        </div>
      </div>
    </section>
  );
}

export default TopSelling;
