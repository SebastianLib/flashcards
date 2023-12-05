import { Link, Navigate } from "react-router-dom";

function Landing() {
  return (
    <section className="relative h-screen bg-[url('assets/hero.jpg')] object-cover flex justify-center items-center">
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white text-center lg:text-start lg:max-w-[50%]">
            Make it easier to learn big topics with flashcards!
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mt-6 text-white text-center lg:text-start lg:max-w-[50%]">
            Join our community of people around the world who use science-based
            online flashcards!
          </p>
          <Link to="/sign-up">
            <button className="px-10 py-4 bg-blue-800 transition-color duration-300 hover:bg-blue-700 text-white mt-6 rounded-xl self-center lg:self-start">
              Sign Up for free!
            </button>
          </Link>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/30"></div>
    </section>
  );
}

export default Landing;
