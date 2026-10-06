import TopBanner from '../components/TopBanner';
import Navbar from '../components/Navbar';
import AllProducts from '../components/AllProducts';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

function Products() {
  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <TopBanner />
      <Navbar />
      <main>
        <AllProducts />
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Products;