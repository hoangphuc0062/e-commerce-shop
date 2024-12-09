import React, { useCallback, useEffect } from "react";
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
import { useContext } from "react";
import { UserContext } from "../../../context/AuthContext";

import BreadcrumbsCustom from "../../../components/Breadcrumbs/Breadcrumbs";
import { formatCurrency, transformAttributes } from "../../../utils/helper";

const ProductDetail = () => {
  const { category, brand, product } = useParams();
  const { loginAuth } = useContext(UserContext);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [viewMoreDescription, setViewMoreDescription] = useState(true);
  const [productLP, setProductLP] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeValueIndex, setActiveValueIndex] = useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [values, setValues] = useState();

  const status = useSelector((state) => state.product.statusDetail);
  const DataProduct = useSelector((state) => state.product.dataDetail);
  const products = useSelector((state) => state.product.data.products);
  const statusLP = useSelector((state) => state.product.status);

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
    // console.log(attr);
    setData((prevData) => ({
      ...prevData,
      price: attr.price,
    }));
    setValues(attr.values);
  };

  const handleValueClick = (index, value) => {
    setActiveValueIndex(index);
    setData((prevData) => ({
      ...prevData,
      price: value.price,
    }));
  };
  useEffect(() => {
    if (DataProduct?.variants?.length > 0) {
      const lastVariantIndex = DataProduct.variants.length - 1;
      setActiveIndex(lastVariantIndex);
      handleAttributeClick(
        lastVariantIndex,
        DataProduct.variants[lastVariantIndex]
      );
    }

    if (DataProduct?.variants?.[0]?.values?.length > 0) {
      const lastValueIndex = DataProduct.variants[0].values.length - 1;
      setActiveValueIndex(lastValueIndex);
      handleValueClick(
        lastValueIndex,
        DataProduct.variants[0].values[lastValueIndex]
      );
    }
  }, [DataProduct]);

  const handleAddToCart = useCallback(() => {
    if (loginAuth === false) {
      handleToast("error", "Bạn cần đăng nhập");
      return;
    }
    const attribute = data?.variants?.[activeIndex];
    const priceAttribute = attribute?.price ? attribute.price : data.price;
    const cartData = {
      productId: data._id,
      attributeId: attribute.values[activeValueIndex]?.id || null,
      key: attribute?.key || null,
      quantity: 1,
      price: priceAttribute,
    };
    dispatch(addCart(cartData))
      .unwrap()
      .then(() => {
        handleToast("success", "Thêm sản phẩm vào giỏ hàng");
        dispatch(getCart());
      })
      .catch(() => {
        handleToast("error", "Không thể thêm sản phẩm vào giỏ hàng");
      });
  }, [dispatch, data, activeIndex, loginAuth, activeValueIndex]);

  const dataImg = [
    data?.thumbnail,
    // data?.videos ?? [],
    ...(data?.images ?? []),
    // ...(data?.attributes?.map((attr) => attr.images) ?? []),
  ];

  return (
    <div className="container p-2 sm:p-4 lg:p-8 w-full flex flex-col gap-4">
      <div>
        <BreadcrumbsCustom />
      </div>
      <section className="block__product flex flex-col gap-3">
        <div className="block__header flex flex-col md:flex-row md:items-center text-[24px]  gap-2">
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
          <div className="block__header--left flex flex-col gap-3  md:w-1/2 min-h-[400px] ">
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
                slidesPerView="auto"
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
                  {data?.shortDescription ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.shortDescription,
                      }}
                    />
                  ) : (
                    "Không có thông tin sản phẩm"
                  )}
                </div>
              </div>
              {/* <div className="w-1/2 text-sm">Chọn vị trí của hàng</div> */}
            </div>
          </div>
          <div className="block__header--right flex flex-col p-4 w-full md:w-1/2 rounded-lg gap-3 ">
            <div>
              {DataProduct?.variants?.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {DataProduct?.variants?.map((variant, index) => (
                    <>
                      <div className="" key={index}>
                        <button
                          onClick={() => handleAttributeClick(index, variant)}
                          className={`w-full border-2 flex items-center gap-2 rounded-xl p-2 text-sm relative ${
                            activeIndex === index
                              ? "border-main"
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
                          <div className="flex flex-col justify-center items-center w-full">
                            <span className="font-bold">{variant?.key}</span>
                            <span>{formatCurrency(variant?.price)}</span>
                          </div>
                        </button>
                      </div>
                    </>
                  ))}
                </div>
              )}
            </div>
            {values && values.length > 0 && (
              <div>
                <span className="text-[20px] font-semibold">Chọn màu sắc</span>
                <div className="grid grid-cols-3 gap-2">
                  {values?.map((value, index) => (
                    <button
                      key={index}
                      onClick={() => handleValueClick(index, value)}
                      className={`flex w-full border-2 rounded-xl p-2 relative ${
                        activeValueIndex === index
                          ? "border-main"
                          : "border-gray-300"
                      }`}
                    >
                      <img src={value?.thumbnail} alt="" />
                      <div>
                        <div className="text-left text-[14px]">
                          {value?.name}
                        </div>
                        <div className="text-[14px] truncate">
                          {formatCurrency(value?.price)}
                        </div>
                      </div>
                      {activeValueIndex === index && (
                        <span className="absolute top-0 right-0 bg-main rounded-bl-lg rounded-tr-lg text-white p-1 text-xs">
                          <Icon
                            icon="akar-icons:check"
                            width="0.8rem"
                            height="0.8rem"
                            className="inline"
                          />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <div></div>
              </div>
            )}

            <div>
              <span className="text-[24px] font-bold mr-2">Giá:</span>
              <span className="text-[24px] font-bold">
                {formatCurrency(data?.price)}
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
        <div
          className={`flex flex-col justify-center items-center w-full md:w-4/6  p-2 rounded-lg shadow-custom ${
            viewMoreDescription ? `h-[900px]` : "h-fit"
          } `}
        >
          <h2 className="text-[24px] font-bold">Thông tin về sản phẩm</h2>
          <div
            className={`${
              viewMoreDescription ? ` h-[800px]` : `min-h-fit`
            } overflow-hidden p-2 `}
          >
            <div dangerouslySetInnerHTML={{ __html: data?.description }} />
          </div>
          <button
            onClick={handleViewMoreDescription}
            className="min-w-[200px] p-2 text-center shadow-lg rounded-lg border-gray-300 border-2 hover:border-2 hover:border-main hover:text-main hover:bg-blue-100 focus:outline-main focus:bg-blue-100 "
          >
            {viewMoreDescription ? (
              <div className="flex items-center justify-center ">
                <span className="w-full">Xem thêm</span>
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
        <div className="w-full md:w-2/6 h-fit p-2 overflow-hidden rounded-lg shadow-custom">
          <div className="flex flex-col gap-3">
            <div className="">
              <h1 className="text-[24px] font-bold">Thông số kỹ thuật</h1>
              {transformAttributes(data?.attributes || []).length > 0 ? (
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                  <tbody>
                    {transformAttributes(data?.attributes || [])
                      .slice(0, 2)
                      .map((spec, specIndex) => (
                        <React.Fragment key={specIndex}>
                          {spec.details.map((detail, detailIndex) => (
                            <tr
                              key={detailIndex}
                              className="border-t border-gray-300"
                            >
                              <td className="px-4 py-2 font-bold">
                                {detail.key}
                              </td>
                              <td className="px-4 py-2">{detail.value}</td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                  </tbody>
                </table>
              ) : (
                <div>Không có thông số kỹ thuật có sẵn</div>
              )}
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
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                      <tbody>
                        {transformAttributes(data?.attributes || []).map(
                          (spec, specIndex) => (
                            <React.Fragment key={specIndex}>
                              {spec.details.map((detail, detailIndex) => (
                                <tr
                                  key={detailIndex}
                                  className="border-t border-gray-300"
                                >
                                  <td className="px-4 py-2">{detail.key}</td>
                                  <td className="px-4 py-2">{detail.value}</td>
                                </tr>
                              ))}
                            </React.Fragment>
                          )
                        )}
                      </tbody>
                    </table>
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
