// eslint-disable-next-line react/prop-types
const Person = ({ name, phone, avatar, role }) => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <img
        src={
          avatar ||
          "https://res.cloudinary.com/dgthe0zuj/image/upload/fl_preserve_transparency/v1717730182/0d64989794b1a4c9d89bff571d3d5842_xytb2b.jpg?_s=public-apps"
        }
        alt="Avatar"
        className="w-16 h-16 rounded-full border"
      />
      <div>
        <h2 className="text-xl font-bold">{name}</h2>
        <p className="text-gray-500">{phone}</p>
        <span className="bg-pink-200 text-pink-700 text-xs font-semibold px-2.5 py-0.5 rounded">
          {role}
        </span>
      </div>
    </div>
  );
};

export default Person;
