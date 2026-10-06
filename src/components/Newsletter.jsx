import { FiMail } from 'react-icons/fi';

function Newsletter() {
  return (
    <section className="px-4 pb-0 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1240px] flex-col justify-between gap-7 rounded-2xl bg-black px-6 py-7 text-white sm:flex-row sm:items-center sm:px-12 sm:py-9">
        <h2 className="text-2xl font-black leading-tight sm:text-3xl">
          STAY UP TO DATE ABOUT
          <br />
          OUR LATEST OFFERS
        </h2>
        <form
          onSubmit={(event) => event.preventDefault()}
          className="flex w-full max-w-[420px] flex-col gap-3"
        >
          <label className="flex h-11 items-center gap-3 rounded-full bg-white px-4 text-black">
            <FiMail className="shrink-0 text-lg text-zinc-500" />
            <input
              type="email"
              placeholder="Enter your email address"
              aria-label="Email address"
              required
              className="w-full outline-none"
            />
          </label>
          <button className="h-11 rounded-full bg-white px-5 text-sm font-semibold text-black hover:bg-zinc-200">
            Subscribe to Newsletter
          </button>
        </form>
      </div>
    </section>
  );
}

export default Newsletter;
