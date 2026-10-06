import { useNavigate } from 'react-router-dom';
import starIcon from '../assets/star.svg';
import couple from '../assets/trendy-fashionable-couple-posing.jpg';

const statistics = [
  { number: '200+', label: 'International Brands' },
  { number: '2,000+', label: 'High-Quality Products' },
  { number: '30,000+', label: 'Happy Customers' },
];

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="overflow-hidden bg-[#f2f0f1]">
      <div className="mx-auto grid max-w-[1240px] items-end px-4 pt-10 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pt-0">
        <div className="py-4 lg:py-20 xl:py-24">
          <h1 className="max-w-[650px] text-[42px] font-black leading-[0.98] tracking-[-2px] sm:text-5xl lg:text-[64px] lg:tracking-[-3px]">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="mt-6 max-w-[560px] text-sm leading-6 text-zinc-600 sm:text-base">
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
          </p>
          <button
            onClick={() => navigate('/#new-arrivals')}
            className="mt-7 w-full rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-zinc-800 sm:w-auto"
          >
            Shop Now
          </button>
          <div className="mt-9 grid max-w-[580px] grid-cols-3 divide-x divide-zinc-300">
            {statistics.map((statistic) => (
              <div key={statistic.label} className="px-3 first:pl-0 last:pr-0 sm:px-7">
                <strong className="block text-xl font-bold sm:text-3xl">
                  {statistic.number}
                </strong>
                <span className="mt-1 block text-[10px] leading-4 text-zinc-600 sm:text-xs">
                  {statistic.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex min-h-[360px] items-end justify-center sm:min-h-[480px] lg:min-h-[600px]">
          <img src={starIcon} alt="" className="absolute right-2 top-10 w-14 sm:right-6 sm:top-16 sm:w-20" />
          <img
            src={couple}
            alt="Two models wearing modern streetwear"
            className="relative z-10 max-h-[580px] w-auto object-contain"
          />
          <img src={starIcon} alt="" className="absolute left-0 top-28 w-8 sm:left-3 sm:top-40 sm:w-12" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
