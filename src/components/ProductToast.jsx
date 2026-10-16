import { FaCheckCircle } from 'react-icons/fa';

function ProductToast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-black px-5 py-4 text-sm font-semibold text-white shadow-2xl transition-all">
      <FaCheckCircle className="shrink-0 text-lg text-emerald-400" />
      <span>{message}</span>
    </div>
  );
}

export default ProductToast;
