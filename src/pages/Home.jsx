import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TopBanner from '../components/TopBanner';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BrandsBar from '../components/BrandsBar';
import NewArrivals from '../components/NewArrivals';
import TopSelling from '../components/TopSelling';
import DressStyle from '../components/DressStyle';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.hash) return;
    document.querySelector(location.hash)?.scrollIntoView();
  }, [location.hash]);

  const openProductsPage = () => {
    navigate('/products');
  };

  return (
    <div>
      <TopBanner />
      <Navbar />
      <Hero />
      <BrandsBar />
      <NewArrivals onViewAll={openProductsPage} />
      <TopSelling onViewAll={openProductsPage} />
      <DressStyle />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
