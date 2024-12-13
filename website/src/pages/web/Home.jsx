import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { SingleBanner } from "../../components/Banner/SingleBanner/SingleBanner";
import SliderBanner from "../../components/Banner/SliderBanner/SliderBanner";

import MenuTree from "../../components/Banner/MenuTree/MenuTree";
import { Accessories } from "../../components/FeatureBlockProduct/Accessories";
import { getAll } from "../../redux/slices/category";

import GridProduct from "../../components/FeatureBlockProduct/GridProduct";

import { getBanners } from "../../redux/slices/barnner";
import { getProducts } from "../../redux/slices/product";
import { Helmet } from "react-helmet-async";

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
  const [dataBanner, setDataBanner] = useState([]);
  const [VerticalBanner, setVerticalBanner] = useState([]);
  const [products, setProducts] = useState([]);
  const [products1, setProducts1] = useState([]);
  const [products2, setProduct2] = useState([]);

  const dispatch = useDispatch();

  const status = useSelector((state) => state.category.status);
  const data = useSelector((state) => state.category.data.categories);
  const statusBanner = useSelector((state) => state.banner.status);
  const Banner = useSelector((state) => state.banner.data);

  useEffect(() => {
    dispatch(getAll());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success" && Array.isArray(data)) {
      setDataCategory(
        data
          .filter((item) => item.type === "product")
          .sort((a, b) => a.position - b.position)
          .map((item) => {
            const brandQueries = item.brand.map((child) => ({
              url: `/${item.slug}/${child.slug}`,
              name: child.name,
            }));

            return {
              id: item._id,
              icon: item.icon,
              links: [{ url: `/${item.slug}`, name: item.name }],
              children: [
                ...(brandQueries.length > 0
                  ? [
                    {
                      title: "Hãng sản xuất",
                      queries: brandQueries,
                    },
                  ]
                  : []),
                {
                  title: "Mức giá",
                  queries: [
                    { url: "/scanner/price/2m", name: "Trên 2 triệu" },
                    { url: "/scanner/price/5m", name: "Trên 5 triệu" },
                    { url: "/scanner/price/7m", name: "Trên 7 triệu" },
                  ],
                },
              ],
            };
          })
      );
    }
  }, [status, data]);
  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  useEffect(() => {
    if (statusBanner === "success" && Array.isArray(Banner)) {
      const now = new Date(); // Get the current time

      const filteredBanners = Banner.filter((item) => item.title === "Home-banner")
        .map((item) => ({
          banner: item.banner
            .filter((child) => {
              const startDate = new Date(child.startDate);
              const endDate = new Date(child.endDate);
              return startDate <= now && endDate >= now; // Filter if current time is within the range
            })
            .map((child) => ({
              id: item._id,
              title: child.name,
              description: child.shotDescription,
              src: child.urlImage,
              link: child.refUrl,
              position: child.position,
              startDate: child.startDate,
              endDate: child.endDate,
            })),
        }));

      setDataBanner(filteredBanners); // Update the state with the filtered banners
    }
  }, [statusBanner, Banner]);


  useEffect(() => {
    if (statusBanner === "success" && Array.isArray(Banner)) {
      const now = new Date(); // Lấy thời gian hiện tại
      setVerticalBanner(
        Banner.filter((item) => item.title === "Vertical-banner").map((item) => ({
          banner: item.banner
            .filter((child) => {
              const startDate = new Date(child.startDate);
              const endDate = new Date(child.endDate);
              return startDate <= now && endDate >= now;
              // Kiểm tra nếu banner nằm trong khoảng thời gian
            })
            .map((child) => ({
              id: item._id,
              image: child.urlImage,
              ref: child.refUrl,
              position: child.position,
              startDate: child.startDate,
              endDate: child.endDate,
            })),
        }))
      );
    }
  }, [statusBanner, Banner]);

  let slug = "dien-thoai";
  let slug1 = "laptop";
  let slug2 = "tivi";

  useEffect(() => {
    dispatch(
      getProducts({
        page: 1,
        limit: 20,
        fields: "name,price,thumbnail,category,brand,discount,slug",
        sort: "-createdAt",
        slug,
      })
    ).then((result) => {
      if (result.type === "products/getProducts/fulfilled") {
        setProducts(result.payload.products);
      }
    });

    dispatch(
      getProducts({
        page: 1,
        limit: 20,
        fields: "name,price,thumbnail,category,brand,discount,slug",
        sort: "-createdAt",
        slug: slug1,
      })
    ).then((result) => {
      if (result.type === "products/getProducts/fulfilled") {
        setProducts1(result.payload.products);
      }
    });

    dispatch(
      getProducts({
        page: 1,
        limit: 20,
        fields: "name,price,thumbnail,category,brand,discount,slug",
        sort: "-createdAt",
        slug: slug2,
      })
    ).then((result) => {
      if (result.type === "products/getProducts/fulfilled") {
        setProduct2(result.payload.products);
      }
    });
  }, [dispatch, slug, slug1, slug2]);

  return (
    <div className="flex flex-col gap-3">
      <Helmet>
        <title>Điện máy Voi Tây Nguyên</title>
        <meta name="description" content="Trang chủ voi Tây Nguyên" />
      </Helmet>
      <section className="flex gap-3">
        <div className="hidden w-1/6 lg:block shadow-lg">
          {dataCategory.length > 0 && <MenuTree dataCategory={dataCategory} />}
        </div>

        <div className="w-full  lg:w-4/6 bg-whiteColor shadow-custom">
          {dataBanner.length > 0 && <SliderBanner data={dataBanner} />}
        </div>

        <div className="hidden w-1/6 lg:block ">
          {VerticalBanner.length > 0 && <SingleBanner data={VerticalBanner} />}
        </div>
      </section>
      <section className="bg-white h-full ">
        {products.length > 0 && <GridProduct data={products} cat={slug} />}
      </section>
      <section className="bg-white h-full ">
        {products1.length > 0 && <GridProduct data={products1} cat={slug1} />}
      </section>
      <section className="bg-white h-full ">
        {products2.length > 0 && <GridProduct data={products2} cat={slug2} />}
      </section>
      <section className="">
        <Accessories datas={datas} title="Phụ kiện" />
      </section>
      <section>Blogs</section>
    </div>
  );
};

export default HomePage;
