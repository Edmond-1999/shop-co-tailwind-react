import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiMenu, FiSearch, FiShoppingCart, FiUser, FiX } from 'react-icons/fi';
import { selectCartCount } from '../store/cartSlice';
import { useGetProductsQuery } from '../store/productsApi';

const navigationLinks = [
  { label: 'On Sale', path: '/#top-selling' },
  { label: 'New Arrivals', path: '/#new-arrivals' },
  { label: 'Brands', path: '/#brands' },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const { data: products = [] } = useGetProductsQuery(8);

  const submitSearch = (event) => {
    event.preventDefault();
    const searchValue = searchText.trim();
    const match = products.find((product) =>
      `${product.title} ${product.category}`.toLowerCase().includes(searchValue.toLowerCase()),
    );
    if (searchValue && match) {
      navigate(`/product/${match.id}`);
    } else {
      navigate('/#new-arrivals');
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="border-b border-zinc-100 bg-white sticky top-0 z-40">
      <div className="mx-auto flex h-[72px] max-w-[1240px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button
          className="rounded-full p-2 text-2xl md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
        <Link to="/" className="shrink-0 text-[26px] font-black tracking-[-1.5px] sm:text-[30px]">
          SHOP.CO
        </Link>

        <ul className={`${isMenuOpen ? 'absolute left-0 right-0 top-[72px] z-50 flex border-b border-zinc-200 bg-white p-5 shadow-lg' : 'hidden'} flex-col gap-5 md:static md:ml-8 md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
          {navigationLinks.map((link) => (
            <li key={link.label}>
              <Link
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-medium hover:text-zinc-500"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-3">
          <form onSubmit={submitSearch} className="hidden h-11 w-[min(440px,38vw)] items-center gap-2 rounded-full bg-zinc-100 px-4 md:flex">
            <FiSearch className="text-xl text-zinc-500" />
            <input
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              type="search"
              placeholder="Search for products..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-500"
            />
          </form>
          <button
            className="text-2xl md:hidden"
            onClick={() => document.querySelector('#mobile-search')?.focus()}
            aria-label="Search"
          >
            <FiSearch />
          </button>

          {/* Cart icon with badge */}
          <Link to="/cart" aria-label={`Shopping cart, ${cartCount} items`} className="relative text-2xl">
            <FiShoppingCart />
            {cartCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </Link>

          <button className="text-2xl" aria-label="Account">
            <FiUser />
          </button>
        </div>
      </div>
      <form onSubmit={submitSearch} className="px-4 pb-3 md:hidden">
        <div className="flex h-10 items-center gap-2 rounded-full bg-zinc-100 px-4">
          <FiSearch className="text-lg text-zinc-500" />
          <input
            id="mobile-search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            type="search"
            placeholder="Search for products..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </form>
    </nav>
  );
}

export default Navbar;
