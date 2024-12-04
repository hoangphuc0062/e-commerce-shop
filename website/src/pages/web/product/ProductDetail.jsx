import React, { useCallback, useContext, useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SwiperSlide, Swiper } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SingleProduct from "../../../components/FeatureBlockProduct/SingleProduct";
import { getProductBySlug, getProducts } from "./../../../redux/slices/product";
import { extractTextFromHtml } from "./../../../../../dashboard/src/utils/extractTextFromHtml";
import { addCart, getCart } from "../../../redux/slices/auth";
import { handleToast } from "../../../ultils/toast";
import Drawer from "@mui/material/Drawer";
import { UserContext } from "../../../context/AuthContext";

const ProductDetail = () => {
  const { loginAuth } = useContext(UserContext);
  const { category, brand, product } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [viewMoreDescription, setViewMoreDescription] = useState(false);
  const [productLP, setProductLP] = useState([]);
  const status = useSelector((state) => state.product.statusDetail);
  const DataProduct = useSelector((state) => state.product.dataDetail);
  const products = useSelector((state) => state.product.data.products);
  const statusLP = useSelector((state) => state.product.status);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  useEffect(() => {
    if (product) {
      dispatch(getProductBySlug(product));
    }
  }, [product, dispatch]);

  useEffect(() => {
    if (status === "success") {
      setData(DataProduct);
    }
  }, [status, DataProduct]);

  useEffect(() => {
    if (category && brand) {
      const slug = brand ? `${category},${brand}` : category;
      dispatch(
        getProducts({
          fields:
            "name,price,thumbnail,description,rating,review,category,brand,discount,slug",
          slug,
        })
      );
    }
  }, [category, brand, dispatch]);

  useEffect(() => {
    if (statusLP === "success") {
      setProductLP(products);
    }
  }, [statusLP, products]);

  const handleViewMoreDescription = () => {
    setViewMoreDescription(!viewMoreDescription);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAttributeClick = (index, attr) => {
    setActiveIndex(index);
    setData((prevData) => ({
      ...prevData,
      price: attr.price,
    }));
  };

  const handleAddToCart = useCallback(() => {
    if (loginAuth === false) {
      handleToast("error", "Vui lòng đăng nhập để thêm sản phẩm");
      return;
    }
    const attribute = data?.variants?.[activeIndex];
    const priceAttribute = attribute?.price ? attribute.price : data.price;

    const cartData = {
      productId: data._id,
      attributeId: attribute?.id || null,
      quantity: 1,
      price: priceAttribute,
    };

    dispatch(addCart(cartData))
      .unwrap()
      .then(() => {
        handleToast("success", "Thêm sản phẩm vào giỏ hàng thành công");
        dispatch(getCart());
      })
      .catch(() => {
        handleToast("error", "Không thể thêm sản phẩm vào giỏ hàng");
      });
  }, [dispatch, data, activeIndex, loginAuth]);

  const dataImg = [
    data?.thumbnail,
    data?.videos ?? [],
    ...(data?.images ?? []),
    // ...(data?.attributes?.map((attr) => attr.images) ?? []),
  ];
  const translations = {
    bao_hanh_1_doi_1: "Bảo hành 1 đổi 1",
    battery: "Dung lượng pin",
    best_discount_price: "Giá khuyến mãi tốt nhất",
    bluetooth: "Bluetooth",
    change_layout_preorder: "Thay đổi bố cục khi đặt hàng trước",
    cpu: "CPU",
    dimensions: "Kích thước",
    display_resolution: "Độ phân giải màn hình",
    display_size: "Kích thước màn hình",
    display_type: "Loại màn hình",
    final_sale_price: "Giá bán cuối cùng",
    flash_sale_from: "Bắt đầu flash sale",
    flash_sale_price: "Giá flash sale",
    hdd_sdd: "Bộ nhớ",
    included_accessories: "Phụ kiện đi kèm",
    key_selling_points: "Điểm nổi bật",
    laptop_bao_mat: "Bảo mật",
    laptop_camera_webcam: "Camera/Webcam",
    laptop_cong_nghe_am_thanh: "Công nghệ âm thanh",
    laptop_cpu: "CPU",
    laptop_ram: "RAM",
    macbook_bao_mat: "Bảo mật",
    macbook_gpu: "GPU",
    macbook_thoi_luong_pin: "Thời lượng pin",
    manufacturer: "Hãng sản xuất",
    nhu_cau_su_dung: "Nhu cầu sử dụng",
    product_weight: "Khối lượng",
    product_condition: "Tình trạng sản phẩm",
    warranty_information: "Thông tin bảo hành",
    weight: "Trọng lượng",
    wlan: "Kết nối không dây",
    // Add more translations as needed
  };

  // Translation function
  const translateKey = (key) =>
    translations[key] ||
    key.replace(/_/g, " ").replace(/\d/g, "").toUpperCase();

  // Updated transformAttributes function
  const transformAttributes = (attributes) => {
    return [
      {
        title: "Thông số kỹ thuật",
        details: Object.entries(attributes).map(([key, value]) => ({
          key: translateKey(key),
          value,
        })),
      },
    ];
  };

  const displayKeys = ["screenSize", "RAM", "storage"];

  return (
    <div className="container p-2 sm:p-4 lg:p-8 w-full flex flex-col gap-4">
      <div>breadcrumb here</div>
      <section className="block__product flex flex-col gap-3">
        <div className="block__header flex items-center text-[24px]  gap-2">
          <span className=" font-bold">{data?.name}</span>
          <span className="flex text-yellow-500">
            <Icon icon="ic:outline-star" />
            <Icon icon="ic:outline-star" />
            <Icon icon="ic:outline-star" />
            <Icon icon="ic:outline-star" />
            <Icon icon="ic:outline-star" />
          </span>
          <span>9 đánh giá</span>
          <button className=" border-main text-main p-1 border-2 text-lg rounded-lg">
            <Icon
              icon="ic:round-plus"
              width="1rem"
              height="1rem"
              className="inline"
            />
            <span className="inline" onClick={() => setIsDrawerOpen(true)}>
              So sánh
            </span>
            <Drawer
              anchor="bottom"
              open={isDrawerOpen}
              onClose={() => {
                setIsDrawerOpen(false);
              }}
            >
              <div className="h-[200px] grid grid-cols-4 p-4">
                <div className="flex flex-col items-center justify-center border-r-2">
                  <Icon icon="ph:plus-square-thin" width="3rem" height="3rem" />
                  <div>Thêm sản phẩm</div>
                </div>
                <div className="flex flex-col items-center justify-center border-r-2">
                  <Icon icon="ph:plus-square-thin" width="3rem" height="3rem" />
                  <div>Thêm sản phẩm</div>
                </div>
                <div className="flex flex-col items-center justify-center border-r-2">
                  <Icon icon="ph:plus-square-thin" width="3rem" height="3rem" />
                  <div>Thêm sản phẩm</div>
                </div>
                <div className="flex flex-col items-center justify-center border-r-2 gap-2">
                  <div>Đã chọn 1 sản phẩm</div>
                  <Link className="bg-main text-white p-2 rounded-lg">
                    So sánh ngay
                  </Link>
                </div>
              </div>
            </Drawer>
          </button>
        </div>
        <div className="flex flex-col md:flex md:flex-row  gap-4">
          <div className="block__header--left flex flex-col gap-3 w-full md:w-1/2 min-h-[400px] ">
            <div className="rounded-lg border-2 p-2">
              <Swiper
                style={{
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
                {dataImg?.map((img, index) => (
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
                {dataImg?.map((img, index) => (
                  <SwiperSlide
                    key={index}
                    style={{ maxWidth: "64px", maxHeight: "64px" }}
                    className="swiper__thumb"
                  >
                    <img className="w-full h-full object-contain" src={img} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="flex gap-2 p-2 rounded-lg border ">
              <div className="w-1/2 text-sm">
                <div className="box-title font-semibold">
                  <p>Thông tin sản phẩm</p>
                </div>
                <div>
                  {data?.shortDescription
                    ? extractTextFromHtml(data.shortDescription)
                    : "Không có thông tin sản phẩm"}
                </div>
              </div>
              <div className="w-1/2 text-sm">Chọn vị trí của hàng</div>
            </div>
          </div>
          <div className="block__header--right flex flex-col p-4 w-full md:w-1/2 rounded-lg gap-3 ">
            {/* bien the here */}
            {/* <div className="grid grid-cols-3 gap-2">
              {data?.variants?.map((attr, index) => (
                <button
                  key={index}
                  onClick={() => handleAttributeClick(index, attr)}
                  className={`w-full border-2 flex items-center gap-2 rounded-lg p-2 text-sm relative ${
                    activeIndex === index
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {activeIndex === index && (
                    <span className="absolute top-0 right-0 bg-main rounded-bl-lg rounded-tr-lg text-white p-1 text-xs">
                      <Icon
                        icon="akar-icons:check"
                        width="0.8rem"
                        height="0.8rem"
                        className="inline"
                      />
                    </span>
                  )}
                  <div className="h-[50px]">
                    <img
                      className="w-full h-full object-contain"
                      src={attr.images || "default-image-url.jpg"}
                      alt={`Variant ${attr.SKU}`}
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold">{attr.screenSize}</span>
                    <span className="text-gray-700">{attr.RAM}</span>
                    <span className="text-gray-700">{attr.storage}</span>
                  </div>
                </button>
              ))}
            </div> */}
            <div className="grid grid-cols-3 gap-2">
              {data?.variants?.map((variant, index) => (
                <button
                  key={index}
                  onClick={() => handleAttributeClick(index, variant)}
                  className={`w-full border-2 flex items-center gap-2 rounded-lg p-2 text-sm relative ${
                    activeIndex === index
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  {activeIndex === index && (
                    <span className="absolute top-0 right-0 bg-main rounded-bl-lg rounded-tr-lg text-white p-1 text-xs">
                      <Icon
                        icon="akar-icons:check"
                        width="0.8rem"
                        height="0.8rem"
                        className="inline"
                      />
                    </span>
                  )}
                  <div className="h-[50px]">
                    <img
                      className="w-full h-full object-contain"
                      src={variant.images || "default-image-url.jpg"}
                      alt={`Variant ${variant.SKU}`}
                    />
                  </div>
                  <div className="flex flex-col">
                    {displayKeys.map((key) => (
                      <span key={key} className="text-gray-700">
                        {variant[key] || ""}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
            <div>
              <span className="text-[24px] font-bold mr-2">
                {data.onStock === 0
                  ? "Hết hàng"
                  : `Hàng còn (${data.onStock}) ${data.unit || ""}`}
              </span>
            </div>
            <div>
              <span className="text-[24px] font-bold mr-2">Giá:</span>
              <span className="text-[24px] font-bold">
                {data.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ
              </span>
            </div>

            {/* khuyen mai */}
            <div className="border rounded-lg">
              <div className="flex items-center w-full text-main bg-blue-200 p-2 gap-2 rounded-tr-lg rounded-tl-lg text-[16px] font-bold ">
                <span>
                  <Icon icon="mdi:gift" width="1rem" height="1rem" />
                </span>
                <span>Khuyến mãi:</span>
              </div>
              <ul className="p-2">
                <li className="flex gap-2">
                  <Icon icon="mdi:check" width="1rem" height="1rem" />
                  <span>Giảm 10% khi mua kèm phụ kiện</span>
                </li>
              </ul>
            </div>

            {/* Action button */}
            <div className="flex gap-2">
              <button className="bg-main border-main  rounded-lg text-white w-10/12">
                <span className="text-[18px]">Mua ngay</span>
                <span className="block">
                  ( Giao hàng nhanh từ 2 giờ hoặc nhận tại cửa hàng)
                </span>
              </button>
              <button
                onClick={handleAddToCart}
                className="flex flex-col justify-center items-center border-2 border-main text-main rounded-lg w-1/6 p-1"
              >
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

      <section>
        <h1 className="text-[24px] font-semibold">Sản phẩm liên quan</h1>
        {productLP.length > 0 ? (
          <SingleProduct data={productLP} />
        ) : (
          <div>Không có sản phẩm liên quan</div>
        )}
      </section>

      <section className="flex flex-col md:flex-row gap-4 p-2">
        <div className="flex flex-col items-center justify-between w-full md:w-4/6 p-2 rounded-lg shadow-lg ">
          <div
            className={`${
              viewMoreDescription ? `h-[400px]` : `min-h-fit`
            } overflow-hidden`}
          >
            {data?.description
              ? extractTextFromHtml(data.description)
              : "Không có mô tả sản phẩm"}
          </div>
          <button
            onClick={handleViewMoreDescription}
            className="w-[20%] p-2 text-center shadow-lg rounded-lg border-gray-300 border-2 hover:border-2 hover:border-main hover:text-main hover:bg-blue-100 focus:outline-main focus:bg-blue-100 "
          >
            {viewMoreDescription ? (
              <div className="flex items-center justify-center">
                <span>Xem thêm</span>
                <span>
                  <Icon icon="ei:chevron-down" width="2rem" height="2rem" />
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <span>Ẩn bớt</span>
                <span>
                  <Icon icon="ei:chevron-up" width="2rem" height="2rem" />
                </span>
              </div>
            )}
          </button>
        </div>
        <div className="w-full md:w-2/6 h-[300px] p-2 rounded-lg shadow-custom">
          <div className="flex flex-col gap-3">
            <div>
              <div className="h-full max-h-[300px]">
                {transformAttributes(data?.attributes || []).map(
                  (spec, specIndex) => (
                    <div key={specIndex}>
                      <div className="font-semibold">{spec.title}</div>
                      {spec.details.splice(0, 5).map((detail, detailIndex) => (
                        <div
                          key={detailIndex}
                          className="flex justify-between p-1"
                        >
                          <span className="w-1/2 line-clamp-2">
                            {detail.key}
                          </span>
                          <span className="w-1/2 line-clamp-2">
                            {detail.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            </div>
            <button
              onClick={handleClickOpen}
              className="w-full p-2 text-center shadow-lg rounded-lg border-gray-300 border-2 hover:border-2 hover:border-main hover:text-main hover:bg-blue-100 focus:outline-main focus:bg-blue-100"
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
                  {transformAttributes(data?.attributes || []).length > 0 ? (
                    transformAttributes(data?.attributes || []).map(
                      (spec, specIndex) => (
                        <div key={specIndex}>
                          <div className="font-semibold">{spec.title}</div>
                          {spec.details.map((detail, detailIndex) => (
                            <div
                              key={detailIndex}
                              className="flex justify-between p-1"
                            >
                              <span className="w-1/2 line-clamp-2">
                                {detail.key}
                              </span>
                              <span className="w-1/2 line-clamp-2">
                                {detail.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )
                    )
                  ) : (
                    <div>Không có thông số kỹ thuật có sẵn</div>
                  )}
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
