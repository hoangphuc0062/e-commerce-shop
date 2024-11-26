import { useEffect, useState, useCallback } from "react";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/system";
import SimpleSlide from "../../../components/Banner/SliderBanner/SimpleSlide";
import ProductCard from "../../../components/FeatureBlockProduct/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, resetState } from "../../../redux/slices/product";
import {
  getCategoryBySlug,
  resetState as resetStateCategory,
} from "../../../redux/slices/category";
import { getBanners } from "../../../redux/slices/barnner";

const Product = () => {
  const { category, brand } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);
  const [productPerPage] = useState(15);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [activeButton, setActiveButton] = useState("");
  const [brands, setBrands] = useState([]);
  const [dataBanner, setDataBanner] = useState([]);
  const [firstHalfBanner, setFirstHalfBanner] = useState([]);
  const [secondHalfBanner, setSecondHalfBanner] = useState([]);
  const [noFoundProduct, setNoFoundProduct] = useState("");

  const statusProduct = useSelector((state) => state.product.status);
  const productsData = useSelector((state) => state.product.data.products);
  const statusBanner = useSelector((state) => state.banner.status);
  const Banner = useSelector((state) => state.banner.data);

  const loadInitialProducts = useCallback(() => {
    const slug = brand ? `${category},${brand}` : category;
    dispatch(
      getProducts({
        limit: productPerPage,
        fields:
          "name,price,thumbnail,description,rating,review,category,brand,discount,slug",
        slug,
      })
    );
  }, [brand, category, dispatch, productPerPage]);

  useEffect(() => {
    loadInitialProducts();
    if (category) {
      dispatch(getCategoryBySlug(category)).then((data) => {
        if (data.type === "category/getBySlug/fulfilled") {
          setBrands(data.payload);
        }
      });
    }
    dispatch(getBanners());
    dispatch(resetStateCategory({ key: "status", value: "idle" }));
  }, [loadInitialProducts, category, dispatch]);

  useEffect(() => {
    if (statusProduct === "success") {
      if (
        !productsData ||
        !Array.isArray(productsData) ||
        productsData.length === 0
      ) {
        setNoFoundProduct("Không có sản phẩm nào");
        setProducts([]);
        setSortedProducts([]);
        setHasMoreProducts(false);
      } else {
        setNoFoundProduct("");
        setProducts(productsData);
        setSortedProducts(productsData);
        setHasMoreProducts(productsData.length >= productPerPage);
      }
    } else if (statusProduct === "failed") {
      navigate("/404");
    }
    dispatch(resetState({ key: "error", value: "null" }));
  }, [statusProduct, productsData, dispatch, navigate, productPerPage]);
  useEffect(() => {
    if (statusBanner === "success" && Array.isArray(Banner)) {
      const filteredData = Banner.filter((item) => item.title === category).map(
        (item) => ({
          banner: item.banner?.map((child) => ({
            id: item._id,
            title: child.name,
            description: child.shotDescription,
            src: child.urlImage,
            link: child.refUrl,
          })),
        })
      );
      setDataBanner(filteredData);

      if (filteredData.length > 0 && Array.isArray(filteredData[0].banner)) {
        const banners = filteredData[0].banner;
        setFirstHalfBanner([{ banner: banners }]);
        setSecondHalfBanner([{ banner: [...banners].reverse() }]);
      } else {
        setFirstHalfBanner([]);
        setSecondHalfBanner([]);
      }
    }
  }, [statusBanner, Banner, category]);

  const loading = () => (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
      {Array.from({ length: 15 }).map((_, index) => (
        <Box sx={{ pt: 0.5 }} key={index}>
          <Skeleton variant="rectangular" height={300} />
          <Skeleton height={40} />
          <Skeleton width="80%" />
          <Skeleton width="60%" />
        </Box>
      ))}
    </div>
  );

  const handleLoadMore = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await dispatch(
        getProducts({
          limit: productPerPage + 15,
          fields:
            "name,price,thumbnail,description,rating,review,category,brand,discount,slug",
          slug: brand ? `${category},${brand}` : category,
        })
      );

      const newProducts = response.payload;

      if (Array.isArray(newProducts) && newProducts.length > 0) {
        setProducts((prev) => [...prev, ...newProducts]);
        setSortedProducts((prev) => [...prev, ...newProducts]);
        setHasMoreProducts(newProducts.length >= productPerPage);
      } else {
        setHasMoreProducts(false);
      }
    } catch (error) {
      setHasMoreProducts(false);
    } finally {
      setIsLoading(false);
    }
  }, [brand, category, dispatch, isLoading, productPerPage]);

  const handleSort = useCallback(
    (criteria) => {
      const sortingCriteria = {
        "price-high-low": (a, b) => b.price - a.price,
        "price-low-high": (a, b) => a.price - b.price,
        discount: (a, b) => b.discountPercent - a.discountPercent,
        views: (a, b) => b.views - a.views,
      };
      const sorted = [...products].sort(sortingCriteria[criteria]);
      setActiveButton(criteria);
      setSortedProducts(sorted);
    },
    [products]
  );

  useEffect(() => {
    setTimeout(() => setFirstLoading(false), 2000);
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div>breadcrumb here</div>
      <section className="flex gap-1">
        <div className="hidden w-full md:block md:w-1/2">
          {firstHalfBanner.length > 0 && <SimpleSlide imgs={firstHalfBanner} />}
        </div>
        <div className="w-full md:w-1/2">
          {secondHalfBanner.length > 0 && (
            <SimpleSlide imgs={secondHalfBanner} />
          )}
        </div>
      </section>
      <section>
        <div className="grid grid-cols-8 gap-3">
          {brands?.brand?.map((_, i) => (
            <Link
              key={i}
              className="round-lg outline outline-gray-100 w-full h-[40px]"
              to={`/${category}/${_.slug}`}
              onClick={() =>
                dispatch(getProducts({ slug: `${category},${_.slug}` }))
              }
            >
              <img
                className="aspect-video w-full h-full"
                src={_.image}
                alt={_.slug}
              />
            </Link>
          ))}
        </div>
      </section>
      <section>
        <h1 className="text-[20px] font-bold">Lọc theo tiêu chí</h1>
        <div className=" sticky">
          <div className="flex gap-2">
            <button className="flex gap-2 items-center bg-gray-200 p-2 rounded-lg">
              <Icon icon="cil:filter" width="1rem" height="1rem" />
              Bộ lọc
            </button>
            <button className="flex gap-2 items-center bg-gray-200 p-2 rounded-lg">
              <Icon icon="iconoir:delivery-truck" width="1rem" height="1rem" />
              Sẵn hàng
            </button>
            <button className="flex gap-2 items-center bg-gray-200 p-2 rounded-lg">
              <Icon icon="bi:cash-coin" width="1rem" height="1rem" />
              Giá
            </button>
            <button className="flex gap-2 items-center bg-gray-200 p-2 rounded-lg">
              <Icon icon="bi:cash-coin" width="1rem" height="1rem" />
              Nhu cầu sử dụng
            </button>
          </div>
        </div>
      </section>
      <section>
        <div>
          <h1 className="text-[20px] font-semibold">Sắp xếp theo</h1>
          <div className="flex gap-2">
            <button
              onClick={() => handleSort("price-high-low")}
              className={`flex items-center bg-gray-200 p-2 rounded-lg ${
                activeButton === "price-high-low"
                  ? "bg-blue-200 outline outline-main text-main"
                  : ""
              }`}
            >
              <Icon icon="proicons:filter" width="1rem" height="1rem" />
              Giá Cao - Thấp
            </button>
            <button
              onClick={() => handleSort("price-low-high")}
              className={`flex items-center bg-gray-200 p-2 rounded-lg ${
                activeButton === "price-low-high"
                  ? "bg-blue-200 outline outline-main text-main"
                  : ""
              }`}
            >
              <Icon
                icon="proicons:filter"
                width="1rem"
                height="1rem"
                className="rotate-180"
              />
              Giá Thấp - Cao
            </button>
            <button
              onClick={() => handleSort("discount")}
              className={`flex items-center bg-gray-200 p-2 rounded-lg ${
                activeButton === "discount"
                  ? "bg-blue-200 outline outline-main text-main"
                  : ""
              }`}
            >
              <Icon
                icon="material-symbols-light:percent"
                width="1rem"
                height="1rem"
              />
              Khuyến Mãi Hot
            </button>
            <button
              onClick={() => handleSort("views")}
              className={`flex items-center bg-gray-200 p-2 rounded-lg ${
                activeButton === "views"
                  ? "bg-blue-200 outline outline-main text-main"
                  : ""
              }`}
            >
              <Icon icon="iconoir:eye" width="1rem" height="1rem" />
              Xem nhiều
            </button>
          </div>
        </div>
      </section>
      {/* <section>
        {firstLoading ? (
          loading()
        ) : (
          <div>
            {(Array.isArray(sortedProducts) && sortedProducts.length > 0) ||
            (Array.isArray(products) && products.length > 0) ? (
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
                {(sortedProducts.length > 0 ? sortedProducts : products).map(
                  (product, index) => (
                    <ProductCard key={index} data={product} />
                  )
                )}
              </div>
            ) : (
              <div className="text-center text-red-500">
                Không có sản phẩm nào
              </div>
            )}
          </div>
        )}
        <div>{isLoading && loading()}</div>
        <div className="flex justify-center my-2">
          {hasMoreProducts && (
            <button
              className="bg-main text-white p-2 rounded-lg"
              onClick={handleLoadMore}
            >
              Xem thêm sản phẩm
            </button>
          )}
          {noFoundProduct && (
            <div className="text-center text-red-500">{noFoundProduct}</div>
          )}
        </div>
      </section> */}
      <section>
        {firstLoading ? (
          loading()
        ) : (
          <div>
            {sortedProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
                {sortedProducts.map((product, index) => (
                  <ProductCard key={index} data={product} />
                ))}
              </div>
            ) : (
              <div className="text-center text-red-500">
                {noFoundProduct || "Không có sản phẩm nào"}
              </div>
            )}
          </div>
        )}
        <div>{isLoading && loading()}</div>
        <div className="flex justify-center my-2">
          {hasMoreProducts && (
            <button
              className="bg-main text-white p-2 rounded-lg"
              onClick={handleLoadMore}
            >
              Xem thêm sản phẩm
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Product;
