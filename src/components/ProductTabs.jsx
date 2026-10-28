const TABS = [
  ['details', 'Product Details'],
  ['reviews', 'Rating & Reviews'],
];

function ProductTabs({ activeTab, setActiveTab, children }) {
  return (
    <section className="mt-14 sm:mt-20">
      <div className="flex border-b border-zinc-200 text-center">
        {TABS.map(([tab, label]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative flex-1 pb-4 text-sm sm:text-base font-medium transition-colors cursor-pointer ${
              activeTab === tab ? 'text-black font-bold' : 'text-zinc-400 hover:text-zinc-600'
            }`}
          >
            {label}
            {activeTab === tab && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-black" />}
          </button>
        ))}
      </div>

      {children}
    </section>
  );
}

export default ProductTabs;