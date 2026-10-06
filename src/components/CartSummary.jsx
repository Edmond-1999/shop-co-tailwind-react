import { useState } from 'react';
import { FiChevronRight, FiTag } from 'react-icons/fi';
import { MdOutlineLocalShipping } from 'react-icons/md';

const DELIVERY_FEE = 15;
const PROMO_CODES = {
  SHOP20: 20,
  SAVE10: 10,
  STYLE15: 15,
};

function CartSummary({ subtotal, itemCount }) {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  const discountPercent = appliedPromo ? PROMO_CODES[appliedPromo] : 20;
  const discountAmount = (subtotal * discountPercent) / 100;
  const delivery = itemCount > 0 ? DELIVERY_FEE : 0;
  const total = Math.max(0, subtotal - discountAmount) + delivery;

  const applyPromo = () => {
    const code = promoInput.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoSuccess(`"${code}" applied — ${PROMO_CODES[code]}% off!`);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try SHOP20, SAVE10, or STYLE15.');
      setPromoSuccess('');
      setAppliedPromo(null);
    }
  };

  return (
    <div className="w-full shrink-0 lg:w-[390px]">
      <div className="rounded-[20px] border border-zinc-200 p-6">
        <h2 className="mb-6 text-xl font-black">Order Summary</h2>

        <div className="space-y-4 text-sm">
          <SummaryRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
          <SummaryRow
            label={`Discount (${discountPercent}%)`}
            value={`-$${discountAmount.toFixed(2)}`}
            valueClass="text-red-500"
          />
          <SummaryRow
            label={(
              <span className="flex items-center gap-1.5">
                <MdOutlineLocalShipping className="text-base text-zinc-500" />
                Delivery Fee
              </span>
            )}
            value={`$${delivery.toFixed(2)}`}
          />
        </div>

        <div className="my-5 border-t border-zinc-200" />

        <div className="flex items-center justify-between text-base font-black">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2 rounded-full bg-[#F0F0F0] px-4 py-3 pr-2">
            <FiTag className="shrink-0 text-zinc-400" />
            <input
              value={promoInput}
              onChange={(event) => setPromoInput(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && applyPromo()}
              type="text"
              placeholder="Add promo code"
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-400"
            />
            <button
              onClick={applyPromo}
              className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white hover:bg-zinc-800 transition cursor-pointer"
            >
              Apply
            </button>
          </div>
          {promoError && <p className="mt-2 text-xs text-red-500">{promoError}</p>}
          {promoSuccess && <p className="mt-2 text-xs font-medium text-emerald-600">{promoSuccess}</p>}
        </div>

        <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-black py-4 text-sm font-semibold text-white hover:bg-zinc-800 transition cursor-pointer">
          Go to Checkout
          <FiChevronRight className="text-base" />
        </button>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, valueClass = 'text-black' }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-zinc-500">{label}</span>
      <span className={`font-medium ${valueClass}`}>{value}</span>
    </div>
  );
}

export default CartSummary;