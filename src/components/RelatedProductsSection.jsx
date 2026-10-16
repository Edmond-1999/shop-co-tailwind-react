import ProductCard from './ProductCard';

function RelatedProductsSection({ products, error }) {
  if (!products.length && !error) return null;

  return (
    <section className="mt-16 border-t border-zinc-100 pt-14 sm:mt-24 sm:pt-20">
      <h2 className="text-center text-3xl font-black uppercase tracking-tight sm:text-4xl">
        YOU MIGHT ALSO LIKE
      </h2>

      {error ? (
        <p className="mt-10 text-center text-sm text-red-500">{error}</p>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default RelatedProductsSection;
