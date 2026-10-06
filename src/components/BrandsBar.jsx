const brands = ['VERSACE', 'ZARA', 'GUCCI', 'PRADA', 'Calvin Klein'];

function BrandsBar() {
  return (
    <section id="brands" className="bg-black py-5 text-white sm:py-7">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-center gap-x-8 gap-y-4 px-4 text-lg font-bold sm:justify-between sm:gap-8 sm:px-6 sm:text-2xl lg:px-8">
        {brands.map((brand) => (
          <span
            key={brand}
            className={brand === 'Calvin Klein' ? 'font-serif text-xl font-medium sm:text-2xl' : ''}
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  );
}

export default BrandsBar;
