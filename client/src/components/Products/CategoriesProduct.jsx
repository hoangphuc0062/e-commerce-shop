import { Link } from "react-router-dom";
import HeadingIndex from "../Heading/HeadingIndex";

const CategoriesProduct = ({ title }) => {
  const categories = [
    {
      id: 1,
      name: "Phụ kiện Apple",
      link: "/products/phu-kien",
      imageUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/i/c/icon-cate-pk_1_.png",
    },

    {
      id: 2,
      name: "Cáp, sạc",
      link: "/products/cap-sac",
      imageUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/i/c/icon-cate-pk_4_.png",
    },
    {
      id: 3,
      name: "Pin sạc dự phòng",
      link: "/products/pin-sac-dung-phong",
      imageUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/tmp/catalog/product/i/c/icon-cate-pk_5_.png",
    },
    {
      id: 4,
      name: "Ốp lưng - Bao da",
      link: "/products/op-lung-bao-da",
      imageUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/i/c/icon-cate-pk_3_.png",
    },
    {
      id: 5,
      name: "Dán màn hình",
      link: "/products/dan-man-hinh",
      imageUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/i/c/icon-cate-pk_2_.png",
    },
    {
      id: 6,
      name: "Thẻ nhớ - USB",
      link: "/products/the-nho-usb",
      imageUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/i/c/icon-cate-pk_8_.png",
    },
    {
      id: 7,
      name: "Gaming Gear, Playstation",
      link: "/products/gaming-gear-playstation",
      imageUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/i/c/icon-cate-pk_13_.png",
    },
    {
      id: 8,
      name: "Sim 4G",
      link: "/products/phu-kien-khac",
      imageUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/i/c/icon-cate-pk_10_.png",
    },
    {
      id: 9,
      name: "Thiết bị Mạng",
      link: "/products/thiet-bi-mang",
      imageUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/i/c/icon-cate-pk_7_.png",
    },
    {
      id: 10,
      name: "Camera",
      link: "/products/camera",
      imageUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/tmp/catalog/product/c/a/cameraa.png",
    },
    {
      id: 11,
      name: "Gimbal",
      link: "/products/gimbal",
      imageUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/i/c/icon-cate-pk_12_.png",
    },
    {
      id: 12,
      name: "Flycam",
      link: "/products/flycam",
      imageUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/i/c/icon-cate-pk_15_.png  ",
    },
    {
      id: 13,
      name: "Máy ảnh",
      link: "/products/may-anh",
      imageUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/i/c/icon-cate-pk_19_.png",
    },
    {
      id: 14,
      name: "Chuột, bàn phím",
      link: "/products/chuot-ban-phim",
      imageUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/i/c/icon-cate-pk_9_.png",
    },
    {
      id: 15,
      name: "Balo, túi xách",
      link: "/products/balo-tui-xach",
      imageUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/tmp/catalog/product/i/c/icon-cate-pk_17_.png",
    },
    {
      id: 16,
      name: "Hub chuyển đổi",
      link: "/products/hub-chuyen-doi",
      imageUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/tmp/catalog/product/i/c/icon-cate-pk_11_.png",
    },
    {
      id: 17,
      name: "Phụ kiện điện thoại",
      link: "/products/phu-kien-dien-thoai",
      imageUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/wysiwyg/suc-khoe-l_m-dep-iconcate_2_.png",
    },
    {
      id: 18,
      name: "Phụ kiện laptop",
      link: "/products/phu-kien-laptop",
      imageUrl:
        "https://cdn2.cellphones.com.vn/insecure/rs:fill:150:0/q:70/plain/https://cellphones.com.vn/media/catalog/product/i/c/icon-cate-pk_16_.png",
    },
  ];
  return (
    <>
      <HeadingIndex title={title} />
      <div className="flex flex-wrap gap-2 p-2 justify-start w-full">
        {categories.map((item) => (
          <Link
            to={item.link}
            key={item.id}
            className="flex w-[156px] h-[156px] relative rounded-lg overflow-hidden cursor-pointer hover:underline"
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full object-cover"
            />
            <div className="absolute top-0 left-0 right-0 bg-opacity-50 text-white p-2">
              <h3 className="text-sm font-semibold">{item.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default CategoriesProduct;
