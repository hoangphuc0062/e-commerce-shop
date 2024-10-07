import { Link } from "react-router-dom";

const HeadingIndex = ({ title, link }) => {
  return (
    <Link
      to={link}
      className="font-semibold text-xl sm:text-2xl leading-snug sm:leading-relaxed text-gray-800 uppercase cursor-pointer"
    >
      {title}
    </Link>
  );
};

export default HeadingIndex;
