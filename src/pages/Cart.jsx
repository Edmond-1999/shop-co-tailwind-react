import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiChevronRight, FiShoppingCart } from 'react-icons/fi';
import TopBanner from '../components/TopBanner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import { selectCartItems, selectCartSubtotal } from '../store/cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <TopBanner />
      <Navbar />

      <main className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 pb-20 pt-2">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 py-5 text-sm text-zinc-500">
          <Link to="/" className="hover:text-black transition">Home</Link>
          <FiChevronRight className="text-xs" />
          <span className="font-semibold text-black">Cart</span>
        </nav>

        <h1 className="mb-6 text-3xl font-black tracking-tight sm:text-4xl">YOUR CART</h1>

        {items.length === 0 ? (
          /* ── Empty state ── */
          <div className="flex flex-col items-center justify-center gap-6 py-24 text-center">
            <FiShoppingCart aria-hidden="true" className="h-16 w-16" />
            <div>
              <p className="text-xl font-bold">Your cart is empty</p>
              <p className="mt-1 text-sm text-zinc-500">Looks like you haven&apos;t added anything yet.</p>
            </div>
            <Link
              to="/#new-arrivals"
              className="rounded-full bg-black px-8 py-3.5 text-sm font-semibold text-white hover:bg-zinc-800 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-5">
            {/* ── Cart items ── */}
            <div className="flex-1 min-w-0 rounded-[20px] border border-zinc-200 divide-y divide-zinc-100 overflow-hidden">
              {items.map((item) => (
                <CartItem key={item.key} item={item} dispatch={dispatch} />
              ))}
            </div>

            {/* ── Order summary ── */}
            <CartSummary subtotal={subtotal} itemCount={items.length} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Cart;
