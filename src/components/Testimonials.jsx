import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Sarah M.',
    text: "I'm blown away by the quality and style of the clothes I received. Every piece is exactly what I hoped for and more.",
  },
  {
    name: 'Alex K.',
    text: "Finding clothes that align with my personal style used to be difficult until I discovered SHOP.CO. The range is incredible.",
  },
  {
    name: 'James L.',
    text: "As someone who is always on the lookout for unique fashion pieces, I'm thrilled to have found this store.",
  },
];

const stars = [1, 2, 3, 4, 5];

function Testimonials() {
  return (
    <section className="py-10 sm:py-16">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black sm:text-4xl">OUR HAPPY CUSTOMERS</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <article key={item.name} className="rounded-2xl border border-zinc-200 p-6">
              <div className="flex text-yellow-500">
                {stars.map((star) => <FaStar key={star} />)}
              </div>
              <h3 className="mt-3 font-bold">
                {item.name} <span className="text-green-600">✓</span>
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-600">“{item.text}”</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
