function ProductFaqs() {
  return (
    <div className="rounded-[24px] border border-zinc-200 bg-white p-6 sm:p-10 space-y-6">
      <h3 className="text-xl font-black uppercase tracking-tight">Frequently Asked Questions</h3>

      <div className="divide-y divide-zinc-200">
        <Faq
          question="What is the fabric composition?"
          answer="This product is crafted from 100% premium combed and ring-spun cotton. It features reinforced double-stitched seams and a ribbed crew neck collar for optimal shape retention."
        />
        <Faq
          question="How does the sizing compare?"
          answer="It fits true to standard size with a tailored casual silhouette. If you prefer a loose, streetwear oversized silhouette, we recommend sizing up one size."
        />
        <Faq
          question="What are the shipping and delivery options?"
          answer="We process and dispatch all orders within 24-48 hours. Standard domestic delivery takes 3 to 5 business days, and express shipping is available at checkout."
        />
        <Faq
          question="What is your exchange and return policy?"
          answer="We provide a 30-day return policy for unused, unwashed apparel with tags attached. Returns are completely free for all domestic orders."
        />
      </div>
    </div>
  );
}

function Faq({ question, answer }) {
  return (
    <div className="py-4">
      <h4 className="font-bold text-base text-black">{question}</h4>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">{answer}</p>
    </div>
  );
}

export default ProductFaqs;