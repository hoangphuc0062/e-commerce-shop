import { Link } from "react-router-dom";

const categories = [
  {
    title: "Chơi game",
    image: "https://cellphones.com.vn/media/wysiwyg/dt-choi-game.png",
    link: "dt-choi-game",
  },
  {
    title: "Điện thoại gập",
    image: "https://cellphones.com.vn/media/wysiwyg/dien-thoai-gap_2.png",
    link: "dien-thoai-gap",
  },
  {
    title: "Chụp ảnh đẹp",
    image: "https://cellphones.com.vn/media/wysiwyg/dt-camera.png",
    link: "dt-camera",
  },
  {
    title: "Livestream",
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/wysiwyg/dt-livestream.png",
    link: "dt-livestream",
  },
  {
    title: "Dung lượng lớn",
    image:
      "https://cellphones.com.vn/media/tmp/catalog/product/a/p/apple-iphone-14-pro-iphone-14-pro-max-deep-purple-220907_inline.jpg.large.png",
    link: "dt-dung-luong-lon",
  },
  {
    title: "Pin trâu",
    image:
      "https://cellphones.com.vn/media/tmp/catalog/product/p/i/pin-trau-0092.png",
    link: "dt-pin-trau",
  },
  {
    title: "Cấu hình cao",
    image:
      "https://cellphones.com.vn/media/tmp/catalog/product/c/a/cauhinhcao.png",
    link: "dt-cau-hinh-cao",
  },
  {
    title: "Điện thoại AI",
    image: "https://cellphones.com.vn/media/wysiwyg/Icon/image_1132_1_.png",
    link: "dt-ai",
  },
  {
    title: "Điện thoại phổ thông",
    image: "https://cellphones.com.vn/media/wysiwyg/bep-hong-ngoai_1_.png",
    link: "dt-pho-thong",
  },
];

const CategorySelector = () => {
  return (
    <div className="w-full p-2">
      {/* For larger screens (flex wrap layout) */}
      <div className="hidden md:flex md:flex-wrap gap-8 cursor-pointer">
        {categories.map((category, index) => (
          <Link
            to={category.link}
            key={index}
            className="relative flex flex-col items-center"
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-[102px] h-[100px] object-cover bg-[#BEB1B1] rounded-lg"
            />
            <span className="absolute p-1 text-white text-sm font-semibold">
              {category.title}
            </span>
          </Link>
        ))}
      </div>

      {/* For smaller screens (horizontal scrolling) */}
      <div className="md:hidden bg-white p-2 overflow-x-auto whitespace-nowrap cursor-pointer">
        <div className="flex space-x-4">
          {categories.map((category, index) => (
            <Link
              to={category.link}
              key={index}
              className="relative flex flex-col items-center shrink-0"
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-[102px] h-[100px] object-cover bg-[#BEB1B1] rounded-lg"
              />
              <span className="absolute p-1 text-white text-sm font-semibold">
                {category.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
export default CategorySelector;
