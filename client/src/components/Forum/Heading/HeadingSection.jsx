function HeadingSection({ title }) {
  return (
    <div className="mt-4 mb-2">
      <h2 className="text-2xl font-bold mb-2 text-black uppercase">{title}</h2>
      <hr className="border-2 border-red-600 w-[120px]" />
    </div>
  );
}

export default HeadingSection;
