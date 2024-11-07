import { useEffect, useState, useCallback } from "react";
import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/system";
import SimpleSlide from "../../../components/Banner/SliderBanner/SimpleSlide";
import ProductCard from "../../../components/FeatureBlockProduct/Card";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, resetState } from "../../../redux/slices/product";
import { getCategoryBySlug } from "../../../redux/slices/category";
import { resetState as resetStateCategory } from "../../../redux/slices/category";
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
  const errorProduct = useSelector((state) => state.product.error);
  const categoryData = useSelector((state) => state.category.data);
  const statusCategory = useSelector(
    (state) => state.category.statusCategoryBySlug
  );
  const loadInitialProducts = useCallback(() => {
    if (statusCategory === "success" && categoryData) {
      const slug = brand ? `${category},${brand}` : category;
      dispatch(
        getProducts({
          limit: productPerPage,
          fields:
            "name,price,thumbnail,description,rating,review,category,brand,discount,slug",
          slug,
        })
      );
    }
  }, [brand, category, categoryData, dispatch, productPerPage, statusCategory]);

  useEffect(() => {
    if (errorProduct !== "null") {
      navigate("/404");
    }
    dispatch(resetState({ key: "status", value: "idle" }));
  }, [errorProduct, navigate, dispatch]);
  useEffect(() => {
    if (
      statusProduct === "success" &&
      productsData.includes("No product found")
    ) {
      setNoFoundProduct("Không có sản phẩm nào");
      setHasMoreProducts(false);
    } else {
      setNoFoundProduct("");
    }
    dispatch(resetState({ key: "error", value: "null" }));
  }, [statusProduct, productsData, dispatch]);

  useEffect(() => {
    loadInitialProducts();
  }, [loadInitialProducts]);

  useEffect(() => {
    if (category) {
      dispatch(getCategoryBySlug(category)).then((data) => {
        if (data.type === "category/getBySlug/fulfilled") {
          setBrands(data.payload);
        }
      });
    }
    dispatch(resetStateCategory({ key: "status", value: "idle" }));
  }, [category, dispatch]);

  useEffect(() => {
    if (statusProduct === "success" && Array.isArray(productsData)) {
      setProducts(productsData);
      setSortedProducts(productsData);
      setHasMoreProducts(productsData.length >= productPerPage);
    }
  }, [statusProduct, productsData, productPerPage]);
  console.log("products");

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
      console.error("Error loading more products:", error);
      setHasMoreProducts(false);
    } finally {
      setIsLoading(false);
    }
  }, [brand, category, dispatch, isLoading, productPerPage]);

  const handleSort = useCallback(
    (criteria) => {
      const sorted = [...products].sort((a, b) => {
        if (criteria === "price-high-low") return b.price - a.price;
        if (criteria === "price-low-high") return a.price - b.price;
        if (criteria === "discount")
          return b.discountPercent - a.discountPercent;
        return b.views - a.views;
      });
      setActiveButton(criteria);
      setSortedProducts(sorted);
    },
    [products]
  );

  useEffect(() => {
    setTimeout(() => setFirstLoading(false), 2000);
  }, []);

  const statusBanner = useSelector((state) => state.banner.status);
  const Banner = useSelector((state) => state.banner.data);

  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);
  useEffect(() => {
    if (statusBanner === "success" && Array.isArray(Banner)) {
      // Lọc và chuẩn bị dữ liệu banner
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

      // Kiểm tra xem filteredData có phần tử và banner có phải là mảng không
      if (filteredData.length > 0 && Array.isArray(filteredData[0].banner)) {
        const banners = filteredData[0].banner;

        setFirstHalfBanner([{ banner: banners }]); // Từ trên xuống
        setSecondHalfBanner([{ banner: [...banners].reverse() }]); // Từ dưới lên
      } else {
        console.warn(
          "filteredData is empty or does not contain a valid banner array."
        );
        setFirstHalfBanner([]);
        setSecondHalfBanner([]);
      }
    }
  }, [statusBanner, Banner, category]);

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
              onClick={() => {
                dispatch(getProducts({ slug: `${category},${_.slug}` }));
              }}
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
      <section>filter here</section>
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
      <section>
        {firstLoading ? (
          loading()
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
            {(sortedProducts.length > 0 ? sortedProducts : products).map(
              (product, index) => (
                <ProductCard key={index} data={product} />
              )
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
          {
            <div className="text-center text-red-500">
              {noFoundProduct && noFoundProduct}
            </div>
          }
        </div>
      </section>
    </div>
  );
};

export default Product;
