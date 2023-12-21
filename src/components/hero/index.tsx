const Hero = (): JSX.Element => {
  return (
    <header className="bg-gray-100 w-full flex justify-center items-center gap-6 py-8 px-5 sm:px-0">
      <div>
        <div className="font-bold text-3xl md:text-7xl leading-7">
          Stay curious.
        </div>
        <div className="font-light mt-4 sm:mt-12">
          Discover stories, thinking, and expertise from writers on any topic.
        </div>
      </div>
      <div className="hidden md:block">
        <img src="/img/logo.webp" alt="" />
      </div>
    </header>
  );
};

export default Hero;
