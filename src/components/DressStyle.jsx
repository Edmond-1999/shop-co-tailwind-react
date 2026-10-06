import { useNavigate } from 'react-router-dom';
import casual from '../assets/man-wearing-white.png';
import formal from '../assets/man-calling.png';
import party from '../assets/cow-girl.png';
import gym from '../assets/man-with-weigh.png';

const styles = [
  { name: 'Casual', image: casual, span: 'md:col-span-2' },
  { name: 'Formal', image: formal, span: 'md:col-span-2' },
  { name: 'Party', image: party, span: 'md:col-span-2' },
  { name: 'Gym', image: gym, span: 'md:col-span-2' },
];

function DressStyle() {
  const navigate = useNavigate();
  return (
    <section id="dress-styles" className="py-14 sm:py-20">
      <div className="mx-auto max-w-[1160px] rounded-[28px] bg-zinc-100 px-5 py-8 sm:px-10 sm:py-12">
        <h2 className="text-center text-2xl font-black sm:text-3xl">BROWSE BY DRESS STYLE</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {styles.map((style) => (
            <button
              key={style.name}
              onClick={() => navigate('/#new-arrivals')}
              className={`${style.span} relative h-40 overflow-hidden rounded-2xl bg-white text-left sm:h-56`}
            >
              <span className="absolute left-6 top-5 z-10 text-lg font-bold sm:text-2xl">{style.name}</span>
              <img
                src={style.image}
                alt={style.name}
                className="absolute inset-0 h-full w-full object-cover object-right transition duration-300 hover:scale-105"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
export default DressStyle;
