import React from "react";
import { useState, useEffect, useContext } from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SwiperSlide, Swiper } from "swiper/react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const product = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  name: "Awesome Product",
  price: "49.99",
  discountPercent: 20,
  description: "This is a great product that you will love.",
  shortDescription: "Great product.",
  rating: 4,
  review: 150,
  category: "Electronics",
  brand: "TechBrand",
  discount: 20,
  slug: "awesome-product",
  images: [
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:0:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-vang-222.png",
    "https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/s/s/ss-s24-ultra-xam-222.png",
  ],
};

// console.log(product.images);
const ProductDetail = () => {
  // const { slug } = useParams();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container p-2 sm:p-4 lg:p-8 w-full flex flex-col gap-4">
      <div>breadcrumb here</div>
      <section className="block__product flex flex-col gap-3">
        <div className="block__header flex items-center text-[24px]  gap-2">
          <span className=" font-bold">Samsung Galaxy Z Fold6 12GB 256GB</span>
          <span className="flex text-yellow-500">
            <Icon icon="ic:outline-star" />
            <Icon icon="ic:outline-star" />
            <Icon icon="ic:outline-star" />
            <Icon icon="ic:outline-star" />
            <Icon icon="ic:outline-star" />
          </span>
          <span>9 đánh giá</span>
          <button className="outline outline-main text-main p-1 text-lg rounded-lg">
            <Icon
              icon="ic:round-plus"
              width="1rem"
              height="1rem"
              className="inline"
            />
            <span className="inline">So sánh</span>
          </button>
        </div>
        <div className="flex gap-4">
          <div className="block__header--left flex flex-col gap-3 w-1/2 min-h-[400px]">
            <div className="shadow-custom p-2 rounded-lg">
              <Swiper
                style={{
                  "--swiper-navigation-color": "#fff",
                  "--swiper-pagination-color": "#fff",
                  height: "400px",
                }}
                loop={true}
                spaceBetween={10}
                navigation={true}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="product__swiper"
              >
                {product &&
                  product?.images.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img className="w-full h-full object-contain" src={img} />
                    </SwiperSlide>
                  ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                style={{ height: "64px" }}
                className="swiper__thumb"
              >
                {product &&
                  product?.images.map((img, index) => (
                    <SwiperSlide
                      key={index}
                      onSwiper={setThumbsSwiper}
                      spaceBetween={10}
                      slidesPerView={10}
                      freeMode={true}
                      watchSlidesProgress={true}
                      modules={[FreeMode, Navigation, Thumbs]}
                      style={{ maxWidth: "64px", maxHeight: "64px" }}
                      className="swiper__thumb"
                    >
                      <img
                        className="w-full h-full object-contain "
                        src={img}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
            <div className="flex gap-2 p-2 rounded-lg shadow-custom">
              <div className="w-1/2 text-sm">
                <div className="box-title font-semibold">
                  <p>Thông tin sản phẩm</p>
                </div>
                <div className="box-content warranty-info">
                  <div className="flex items-start">
                    <Icon
                      icon="fluent:phone-32-light"
                      width="1.5rem"
                      height="1.5rem"
                    />
                    <div className="description">
                      Mới, đầy đủ phụ kiện từ nhà sản xuất
                    </div>
                  </div>

                  <div className=" flex items-start">
                    <Icon
                      icon="system-uicons:box-open"
                      width="1.5rem"
                      height="1.5rem"
                    />
                    <div className="description">
                      Điện thoại thông minh <br />
                      2. Cáp truyền dữ liệu <br />
                      3. Que lấy sim <br />* Galaxy S24 Ultra không bao gồm củ
                      sạc.
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/2 text-sm">Chọn vị trí của hàng</div>
            </div>
          </div>
          <div className="block__header--right flex flex-col shadow-custom p-4 rounded-lg gap-3 w-1/2">
            {/* bien the here */}
            <div className="grid grid-cols-3 gap-2">
              <button className="outline outline-gray-300 rounded-lg p-2 text-sm relative">
                <span className="block font-semibold">12GB 1TB </span>
                <span className="text-gray-700">52.990.000 đ</span>
              </button>
              <button className="outline outline-gray-300 rounded-lg p-2 text-sm relative">
                <span className="block font-semibold">12GB 1TB </span>
                <span className="text-gray-700">52.990.000 đ</span>
              </button>
              <button className="outline outline-main  p-2 rounded-lg text-sm relative">
                <span className="block font-semibold">12GB 1TB </span>
                <span className="text-gray-700">52.990.000 đ</span>
                <span className=" absolute top-0 right-0 bg-main rounded-bl-lg rounded-tr-lg text-white p-1 text-xs">
                  <Icon
                    icon="akar-icons:check"
                    width="0.8rem"
                    height="0.8rem"
                    className="inline"
                  />
                </span>
              </button>
            </div>
            {/* Biến thể màu sản phẩm */}
            <div className="flex flex-col gap-2">
              <div>Chọn màu sản phẩm</div>
              <div className="grid grid-cols-3 gap-2">
                <button className="outline outline-gray-300 flex items-center gap-2 rounded-lg p-2 text-sm relative">
                  <div>
                    <img
                      src="https://cdn2.cellphones.com.vn/insecure/rs:fill:50:50/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/m/image_1171.png"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">12GB 1TB </span>
                    <span className="text-gray-700">52.990.000 đ</span>
                  </div>
                </button>
                <button className="outline outline-gray-300 flex items-center gap-2  rounded-lg p-2 text-sm relative">
                  <div>
                    <img
                      src="https://cdn2.cellphones.com.vn/insecure/rs:fill:50:50/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/m/image_1171.png"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">12GB 1TB </span>
                    <span className="text-gray-700">52.990.000 đ</span>
                  </div>
                </button>
                {/* Active */}
                <button className="outline outline-main flex items-center rounded-lg gap-2 p-2 text-sm relative">
                  <div>
                    <img
                      src="https://cdn2.cellphones.com.vn/insecure/rs:fill:50:50/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/m/image_1171.png"
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">12GB 1TB </span>
                    <span className="text-gray-700">52.990.000 đ</span>
                    <span className=" absolute top-0 right-0 bg-main rounded-bl-lg rounded-tr-lg text-white p-1 text-xs">
                      <Icon
                        icon="akar-icons:check"
                        width="0.8rem"
                        height="0.8rem"
                        className="inline"
                      />
                    </span>
                  </div>
                </button>
              </div>
            </div>
            <div>
              <div>Giá</div>
              <span className="text-[24px] font-bold">52.990.000 đ</span>
            </div>
            {/* Action button */}
            <div className="flex gap-2">
              <button className="bg-main outline-main  rounded-lg text-white w-10/12">
                <span className="text-[18px]">Mua ngay</span>
                <span className="block">
                  ( Giao hàng nhanh từ 2 giờ hoặc nhận tại cửa hàng)
                </span>
              </button>
              <button className="flex flex-col justify-center items-center outline outline-main text-main rounded-lg w-1/6 p-1">
                <span>
                  <Icon
                    icon="solar:cart-plus-outline"
                    width="2rem"
                    height="2rem"
                  />
                </span>
                <span className="text-sm">Thêm vào giỏ</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <hr />
      <section>Sản phẩm tương tự</section>
      <section className="flex gap-4">
        <div className="w-4/6 p-2 rounded-lg shadow-custom ">
          description here
        </div>
        <div className="w-2/6 p-2 rounded-lg shadow-custom ">
          <div>
            <table className="table-auto text-left">
              <thead>
                <tr className="">
                  <th>Thông số kỹ thuật</th>
                </tr>
              </thead>
              <tbody>
                <tr className="gap-2 ">
                  <td className="line-clamp-2">Kích thước màn hình</td>
                  <td className="px-2">6.8 inches</td>
                </tr>
                <tr className="gap-2">
                  <td className="line-clamp-2">Kích thước màn hình</td>
                  <td className="px-2">6.8 inches</td>
                </tr>
                <tr className="gap-2">
                  <td className="line-clamp-2">Kích thước màn hình</td>
                  <td className="px-2">6.8 inches</td>
                </tr>
                <tr className="gap-2">
                  <td className="line-clamp-2">Kích thước màn hình</td>
                  <td className="px-2">6.8 inches</td>
                </tr>
                <tr className="gap-2">
                  <td className="line-clamp-2">Kích thước màn hình</td>
                  <td className="px-2">6.8 inches</td>
                </tr>
              </tbody>
            </table>
            <button
              onClick={handleClickOpen}
              className="w-full p-2 text-center shadow-custom rounded-lg hover:outline hover:outline-main hover:text-main hover:bg-blue-100 focus:outline-main focus:bg-blue-100 focus"
            >
              Xem chi tiết
            </button>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              PaperProps={{
                style: {
                  width: "80%",
                },
              }}
            >
              <DialogTitle id="alert-dialog-title">
                Thông số kỹ thuật
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <div className="flex gap-2">
                    <td className="line-clamp-2 w-2/3">Kích thước màn hình</td>
                    <td className="px-2">6.8 inches</td>
                  </div>
                  <div className="flex gap-2">
                    <td className="line-clamp-2  w-2/3">Kích thước màn hình</td>
                    <td className="px-2">6.8 inches</td>
                  </div>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Đóng</Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
