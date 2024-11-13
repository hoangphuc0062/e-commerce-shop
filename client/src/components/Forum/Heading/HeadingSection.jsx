function HeadingSection({ title }) {
  return (
    <div className="mt-4 mb-2">
      <h2 className="lg:text-2xl text-xl font-bold mb-2 text-black uppercase">
        {title}
      </h2>
      <hr className="border-2 border-main lg:w-[120px] w-[80px]" />
    </div>
  );
}

export default HeadingSection;
