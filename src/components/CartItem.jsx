import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { removeFromCart, updateQuantity } from '../store/cartSlice';

function CartItem({ item, dispatch }) {
  return (
    <div className="flex gap-4 p-5">
      <Link to={`/product/${item.id}`} className="shrink-0">
        <img
          src={item.image}
          alt={item.title}
          className="h-[100px] w-[100px] rounded-xl object-cover sm:h-[120px] sm:w-[120px]"
        />
      </Link>

      <div className="flex flex-1 min-w-0 flex-col justify-between">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link to={`/product/${item.id}`} className="text-sm font-bold leading-tight line-clamp-2 hover:text-zinc-600 transition">
              {item.title}
            </Link>
            <div className="mt-1 space-y-0.5 text-xs text-zinc-500">
              <p>Size: <span className="text-black font-medium">{item.size}</span></p>
              <p>Color: <span className="text-black font-medium">{item.color}</span></p>
            </div>
          </div>
          <button
            onClick={() => dispatch(removeFromCart(item.key))}
            className="shrink-0 rounded-full p-1.5 text-red-400 hover:bg-red-50 hover:text-red-600 transition cursor-pointer"
            aria-label="Remove item"
          >
            <FiTrash2 className="text-base" />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black">${(item.price * item.quantity).toFixed(2)}</span>
            {item.discountPercentage > 0 && (
              <span className="text-xs text-zinc-400 line-through">
                ${(item.price * item.quantity * (1 + item.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 rounded-full bg-[#F0F0F0] px-3 py-1.5">
            <button
              onClick={() => dispatch(updateQuantity({ key: item.key, quantity: item.quantity - 1 }))}
              className="text-sm text-zinc-600 hover:text-black transition cursor-pointer"
              aria-label="Decrease quantity"
            >
              <FiMinus />
            </button>
            <span className="min-w-[16px] text-center text-sm font-semibold">{item.quantity}</span>
            <button
              onClick={() => dispatch(updateQuantity({ key: item.key, quantity: item.quantity + 1 }))}
              className="text-sm text-zinc-600 hover:text-black transition cursor-pointer"
              aria-label="Increase quantity"
            >
              <FiPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;