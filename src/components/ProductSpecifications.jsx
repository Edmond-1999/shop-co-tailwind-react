function ProductSpecifications({ product }) {
  return (
    <div className="rounded-[24px] border border-zinc-200 bg-white p-6 sm:p-10">
      <h3 className="text-xl font-black uppercase tracking-tight">
        Technical Specifications &amp; Overview
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">
        Engineered for all-day comfort and long-lasting quality. All materials are ethically sourced and verified for premium everyday wear.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Specification label="Material & Fabric" value="100% Breathable Combed Cotton (180 GSM)" />
        <Specification label="Fit & Cut" value="Relaxed Modern Streetwear Fit" />
        <Specification label="Brand" value={product.brand || 'SHOP.CO Essentials'} />
        <Specification label="SKU" value={product.sku || 'SHP-TEE-001'} />
        <Specification label="Shipping Info" value={product.shippingInformation || 'Standard: 3-5 business days'} />
        <Specification label="Return Policy" value={product.returnPolicy || '30 days hassle-free return'} />
      </div>

      <div className="mt-8 border-t border-zinc-100 pt-6">
        <h4 className="text-sm font-bold uppercase tracking-wider text-black">Care Instructions</h4>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-zinc-600">
          <li>Machine wash cold with like colors inside out.</li>
          <li>Use mild detergent only; do not bleach.</li>
          <li>Tumble dry low or air dry to preserve fabric and graphic print vibrancy.</li>
          <li>Iron at low temperature if necessary; do not iron directly onto printed graphics.</li>
        </ul>
      </div>
    </div>
  );
}

function Specification({ label, value }) {
  return (
    <div className="rounded-2xl bg-[#F0EEED]/60 p-5">
      <span className="text-xs font-semibold uppercase text-zinc-400">{label}</span>
      <p className="mt-1 font-bold text-black">{value}</p>
    </div>
  );
}

export default ProductSpecifications;