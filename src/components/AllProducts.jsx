import ProductCard from './ProductCard';
import { useGetProductsQuery } from '../store/productsApi';

function AllProducts() {
  const { data: allItems = [], isLoading, isError, error } = useGetProductsQuery(50);

  return (
    <section id="all-products" className="border-b border-zinc-200 py-14 sm:py-20">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-black tracking-[-1px] sm:text-4xl">ALL PRODUCTS</h2>
        {isLoading && <p className="py-10 text-center text-zinc-500">Loading products...</p>}
        {isError && (
          <p className="py-10 text-center text-red-500">
            {error?.data?.message || error?.error || 'Unable to load products.'}
          </p>
        )}
        {!isLoading && !isError && allItems.length === 0 && (
          <p className="py-10 text-center text-zinc-500">No products found.</p>
        )}
        {!isLoading && !isError && allItems.length > 0 && (
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {allItems.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        )}
      </div>
    </section>
  );
}

export default AllProducts;