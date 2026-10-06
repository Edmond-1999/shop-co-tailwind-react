import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function TopBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-black px-4 py-2.5 text-center text-xs text-white sm:text-sm">
      <div className="mx-auto flex max-w-[1240px] items-center justify-center">
        <span>
          Sign up and get 20% off to your first order.{' '}
          <Link
            to="/#new-arrivals"
            className="font-semibold underline decoration-solid underline-offset-2 hover:text-zinc-300"
          >
            Sign Up Now
          </Link>
        </span>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 text-zinc-400 transition hover:text-white"
        aria-label="Dismiss banner"
      >
        <FiX className="text-base" />
      </button>
    </div>
  );
}

export default TopBanner;
