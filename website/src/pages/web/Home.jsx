import { SingleBanner } from "../../components/Banner/SingleBanner/SingleBanner";
import SliderBanner from "../../components/Banner/SliderBanner/SliderBanner";

import MenuTree from "../../components/Banner/MenuTree/MenuTree";

import { faker } from "@faker-js/faker";
import { Accessories } from "../../components/FeatureBlockProduct/Accessories";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAll } from "../../redux/slices/category";
import { useState } from "react";

import GridProduct from "../../components/FeatureBlockProduct/GridProduct";


function createRandomProduct() {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    image: faker.image.avatar(),
    price: faker.commerce.price(),
    discountPercent: faker.number.int({ min: 0, max: 50 }),
    description: faker.commerce.productDescription(),
    rating: faker.number.int({ min: 1, max: 5 }),
    review: faker.number.int({ min: 0, max: 1000 }),
    category: faker.commerce.department(),
    brand: faker.commerce.department(),
    discount: faker.number.int({ min: 0, max: 50 }),
    slug: faker.lorem.slug(),
    images: [faker.image.url(300, 300, "tech", true)],
  };
}

const products = Array.from({ length: 20 }, createRandomProduct);
const products1 = Array.from({ length: 10 }, createRandomProduct);
const products2 = Array.from({ length: 10 }, createRandomProduct);
const products3 = Array.from({ length: 10 }, createRandomProduct);
const products4 = Array.from({ length: 10 }, createRandomProduct);

const datas = [
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

const HomePage = () => {
  const [dataCategory, setDataCategory] = useState([]);

  const dispatch = useDispatch();

  const status = useSelector((state) => state.category.status);
  const data = useSelector((state) => state.category.data);

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success" && Array.isArray(data)) {
      setDataCategory(
        data
          .filter((item) => item.type === "product")
          .map((item) => ({
            id: item._id,
            icon: item.icon,
            links: [{ url: `/${item.slug}`, name: item.name }],
            children: [
              {
                title: "Hãng sản xuất",
                queries: [
                  ...item.brand.map((child) => ({
                    url: `/${item.slug}/${child.slug}`,
                    name: child.name,
                  })),
                ],
              },
              // {
              //   title: "Mức giá",
              //   queries: [
              //     { url: "/scanner/price/2m", name: "Trên 2 triệu" },
              //     { url: "/scanner/price/5m", name: "Trên 5 triệu" },
              //     { url: "/scanner/price/7m", name: "Trên 7 triệu" },
              //   ],
              // },
            ],
          }))
      );
    }
  }, [status, data]);

  return (
    <div className="flex flex-col gap-3">
      <section className="flex gap-3">
        <div className="hidden w-1/6 lg:block shadow-lg">
          {dataCategory.length > 0 && <MenuTree dataCategory={dataCategory} />}
        </div>
        <div className="w-full  lg:w-4/6 bg-whiteColor shadow-custom">
          <SliderBanner />
        </div>

        <div className="hidden w-1/6 lg:block ">
          <SingleBanner />
        </div>
      </section>
      <section className="bg-white h-full ">
        <GridProduct data={products} />
      </section>
      <section className="bg-white h-full ">
        <GridProduct data={products1} />
      </section>
      <section className="bg-white h-full ">
        <GridProduct data={products2} />
      </section>
      <section className="bg-white h-full ">
        <GridProduct data={products3} />
      </section>
      <section className="bg-white h-full ">
        <GridProduct data={products4} />
      </section>

      <section className="">
        <Accessories datas={datas} title="Phụ kiện" />
      </section>
      <section>Blogs</section>
    </div>
  );
};

export default HomePage;
