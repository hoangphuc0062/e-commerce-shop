import { Link } from "react-router-dom";

export const SingleBanner = ({ data }) => {
  return (
    <div className=" grid grid-rows-5 w-full h-full gap-3 ">
      {data[0].banner.map((banner, index) => (
        <div className="w-full shadow-custom p-2 " key={index}>
          <Link to={banner.ref}>
            <img
              key={banner.id}
              src={banner.image}
              alt="banner"
              className="w-full h-full object-fill"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};
