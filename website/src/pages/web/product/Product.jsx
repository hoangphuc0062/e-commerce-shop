import { useEffect, useState, useCallback, act, useRef } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Icon } from "@iconify/react";

import Skeleton from "@mui/material/Skeleton";
import { Box } from "@mui/system";
import Slider from "@mui/material/Slider";

import SimpleSlide from "../../../components/Banner/SliderBanner/SimpleSlide";
import ProductCard from "../../../components/FeatureBlockProduct/Card";

import { useDispatch, useSelector } from "react-redux";
import { getProducts, resetState } from "../../../redux/slices/product";
import {
  getCategoryBySlug,
  resetState as resetStateCategory,
} from "../../../redux/slices/category";
import { getBanners } from "../../../redux/slices/barnner";
import { getSettingFilter } from "../../../redux/slices/settingFilter";

import {
  formatCurrency,
  objectToQueryString,
  splitValues,
  updateSelectedFiltersWithKeys,
} from "../../../utils/helper";
import BreadcrumbsCustom from "../../../components/Breadcrumbs/Breadcrumbs";

const Product = () => {
  const { category, brand } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

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

  const dialogRefs = useRef([]);
  const [filters, setFilters] = useState("");
  const [active, setActive] = useState({});
  const [hidden, setHidden] = useState({});
  const [activeChild, setActiveChild] = useState({});
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [userMinPrice, setUserMinPrice] = useState();
  const [userMaxPrice, setUserMaxPrice] = useState();
  const [selectedFilters, setSelectedFilters] = useState({});
  const [queryFilter, setQueryFilter] = useState();

  const statusProduct = useSelector((state) => state.product.status);
  const productsData = useSelector((state) => state.product.data.products);
  const countProduct = useSelector((state) => state.product.data.counts);
  const statusBanner = useSelector((state) => state.banner.status);
  const Banner = useSelector((state) => state.banner.data);

  const loadInitialProducts = useCallback(() => {
    const slug = brand ? `${category},${brand}` : category;
    dispatch(
      getProducts({
        limit: productPerPage,
        fields:
          "name,price,thumbnail,view,category,brand,discount,slug,attributes",
        slug,
      })
    );
  }, [brand, category, dispatch, productPerPage]);
  useEffect(() => {}, [category]);
  useEffect(() => {
    loadInitialProducts();
    if (category) {
      dispatch(getCategoryBySlug(category)).then((data) => {
        if (data.type === "category/getBySlug/fulfilled") {
          setBrands(data.payload);
        }
      });
      dispatch(getSettingFilter({ search: category })).then((data) => {
        if (data.type === "settingFilter/getSettingFilter/fulfilled") {
          setFilters(data?.payload?.settingFilters[0]?.filterButton);
          // console.log(data.payload.settingFilters[0].filterButton);
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
          limit: products.length + 15,
          fields: "name,price,thumbnail,view,category,brand,discount,slug",
          slug: brand ? `${category},${brand}` : category,
        })
      );

      const newProducts = response.payload;

      if (Array.isArray(newProducts) && newProducts.length > 0) {
        setProducts((prev) => [...prev, ...newProducts]);
        setSortedProducts((prev) => [...prev, ...newProducts]);
        setHasMoreProducts(newProducts.length === 15); // Check if there are more products to load // Check if there are more products to load
      }
      if (products.length === countProduct) {
        setHasMoreProducts(false);
      }
    } catch (error) {
      setHasMoreProducts(false);
    } finally {
      setIsLoading(false);
    }
  }, [brand, category, dispatch, isLoading, products.length, countProduct]);

  const handleSort = useCallback(
    (criteria) => {
      const sortingCriteria = {
        "price-high-low": (a, b) => b.price - a.price,
        "price-low-high": (a, b) => a.price - b.price,
        discount: (a, b) => b.discount - a.discount,
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

  const handleClickOutside = (event) => {
    filters.forEach((_, index) => {
      if (
        dialogRefs.current[index] &&
        !dialogRefs.current[index].contains(event.target)
      ) {
        setHidden((prevHidden) => ({
          ...prevHidden,
          [index]: true,
        }));
        setActive((prevActive) => ({
          ...prevActive,
          [index]: false,
        }));
      }
    });
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filters]);

  useEffect(() => {
    if (filters) {
      filters.forEach((filter) => {
        if (filter?.label === "Giá") {
          const minMaxPrice = splitValues(filter?.values);
          const regex = /\d+/g;
          const minPrice = minMaxPrice[0].match(regex)?.[0];
          const maxPrice = minMaxPrice[1].match(regex)?.[0];
          setMinPrice(Number(minPrice));
          setMaxPrice(Number(maxPrice));
          setUserMinPrice(Number(minPrice));
          setUserMaxPrice(Number(maxPrice));
        }
      });
    }
  }, [filters]);

  const handleToggleActive = (index, setActive) => {
    setActive((prevActive) => ({
      ...prevActive,
      [index]: !prevActive[index],
    }));
  };

  const handleToggleHidden = (index, setHidden) => {
    setHidden((prevHidden) => ({
      ...prevHidden,
      [index]: false,
    }));
  };

  const handleChildClick = (label, value, index, inx, setActiveChild) => {
    setActiveChild((prevActiveChild) => ({
      ...prevActiveChild,
      [index]: {
        ...prevActiveChild[index],
        [inx]: !prevActiveChild[index]?.[inx],
      },
    }));
    handleSelectValue(label, value); // Cập nhật selectedFilters
  };

  const handleSelectValue = (label, value) => {
    setSelectedFilters((prev) => {
      // Nếu label là "Giá", lưu cấu trúc minPrice và maxPrice
      if (label === "Giá") {
        return {
          ...prev,
          [label]: {
            minPrice: value.minPrice,
            maxPrice: value.maxPrice,
          },
        };
      }
      // Đối với các label khác, lưu danh sách giá trị
      const prevValues = prev[label] || [];
      const updatedValues = prevValues.includes(value)
        ? prevValues.filter((v) => v !== value) // Bỏ giá trị nếu đã chọn
        : [...prevValues, value]; // Thêm giá trị mới

      return {
        ...prev,
        [label]: updatedValues,
      };
    });
  };

  const isActiveLabel = (label) => {
    const values = selectedFilters[label];

    // Kiểm tra trạng thái "Giá"
    if (label === "Giá") {
      // Active nếu "Giá" có giá trị hợp lệ trong selectedFilters hoặc giá trị hiện tại khác mặc định
      return (
        (values?.minPrice !== undefined && values?.maxPrice !== undefined) ||
        userMinPrice !== Number(minPrice) ||
        userMaxPrice !== Number(maxPrice)
      );
    }

    // Kiểm tra trạng thái các label khác
    if (Array.isArray(values)) {
      return values.length > 0; // Active nếu có giá trị trong mảng
    }
    if (typeof values === "object") {
      return Object.keys(values).length > 0; // Active nếu object chứa giá trị
    }
    return false; // Không active nếu không có giá trị
  };

  const cleanSelectedFilters = (filters) => {
    return Object.entries(filters).reduce((acc, [key, value]) => {
      if (Array.isArray(value) && value.length === 0) {
        return acc; // Bỏ qua nếu là mảng rỗng
      }
      if (typeof value === "object" && Object.keys(value).length === 0) {
        return acc; // Bỏ qua nếu là object rỗng
      }
      return { ...acc, [key]: value }; // Giữ lại các giá trị hợp lệ
    }, {});
  };
  const handleApplyFilters = (
    index,
    userMinPrice,
    userMaxPrice,
    minPrice,
    maxPrice,
    selectedFilters,
    setSelectedFilters,
    setActive,
    setHidden
  ) => {
    // Kiểm tra nếu người dùng thực sự áp dụng bộ lọc giá
    let updatedFilters = { ...selectedFilters };

    if (
      userMinPrice !== Number(minPrice) || // Nếu giá trị người dùng khác giá trị mặc định
      userMaxPrice !== Number(maxPrice)
    ) {
      updatedFilters = {
        ...updatedFilters,
        Giá: {
          minPrice: userMinPrice,
          maxPrice: userMaxPrice,
        },
      };
    }

    updatedFilters = cleanSelectedFilters(updatedFilters);

    setSelectedFilters(updatedFilters);

    // Đảm bảo label luôn active
    setActive((prev) => ({
      ...prev,
      [index]: true,
    }));

    // Ẩn modal sau khi áp dụng
    handleToggleHidden(index, setHidden);
    handleToggleActive(index, setActive);
  };

  const resetSelectedFilters = () => {
    setSelectedFilters({}); // Xóa tất cả các bộ lọc đã chọn
    setActive({}); // Xóa trạng thái active
    setActiveChild({}); // Xóa trạng thái activeChild
    setQueryFilter();
    setSearchParams(""); // Clear search query
  };

  const removeLabel = (key) => {
    setSelectedFilters((prev) => {
      const updatedFilters = { ...prev };
      delete updatedFilters[key];
      return updatedFilters;
    });
    setActiveChild({});
    setQueryFilter();
  };

  useEffect(() => {
    setQueryFilter(updateSelectedFiltersWithKeys(filters, selectedFilters));
    if (queryFilter) {
      let query = objectToQueryString(queryFilter);
      setSearchParams(query);
      console.log("Query filter:", query);
    }
  }, [filters, selectedFilters]);

  return (
    <div className="container sm:p-4 lg:p-8 w-full flex flex-col gap-4">
      <div>
        <BreadcrumbsCustom />
      </div>
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
                dispatch(
                  getProducts({
                    fields: "name,price,thumbnail,category,brand,discount,slug",
                    slug: `${category},${_.slug}`,
                  })
                )
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
      <section className="flex flex-col gap-2">
        <h1 className="text-[20px] font-bold">Lọc theo tiêu chí</h1>
        <div className="sticky z-10 ">
          <div className="flex gap-2 flex-wrap">
            {filters &&
              filters.map((filter, index) => (
                <div className="relative" key={index}>
                  {/* render setting filter here */}
                  <div>
                    <button
                      onClick={() => {
                        handleToggleActive(index, setActive);
                        handleToggleHidden(index, setHidden);
                      }}
                      className={`flex gap-2 items-center z-20 bg-gray-200 p-2 rounded-lg 
                    ${active[index] ? "active" : ""} 
                    ${isActiveLabel(filter?.label) ? "active" : ""}`}
                    >
                      {filter?.label}
                      <Icon
                        icon="mdi-light:chevron-down"
                        width="1rem"
                        height="1rem"
                      />
                    </button>
                  </div>

                  {/* value render here */}
                  {active?.[index] && (
                    <div
                      ref={(el) => (dialogRefs.current[index] = el)}
                      className={`absolute z-10 bg-white mt-1 p-2 rounded-lg shadow-custom
                         ${hidden[index] === false ? "block" : "hidden"}
                         
                      `}
                    >
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap gap-2 w-[300px]">
                          {filter?.label !== "Giá" &&
                            splitValues(filter?.values).map((value, inx) => (
                              <button
                                key={inx}
                                onClick={() =>
                                  handleChildClick(
                                    filter?.label,
                                    value,
                                    index,
                                    inx,
                                    setActiveChild
                                  )
                                }
                                className={`relative bg-gray-200 w-max p-3 rounded-lg ${
                                  activeChild[index]?.[inx] ? "active" : ""
                                }
                                `}
                              >
                                {value}
                                {activeChild[index]?.[inx] && (
                                  <div className="absolute top-0 left-0 bg-main text-white rounded-tl-lg rounded-br-lg">
                                    <Icon
                                      icon="material-symbols-light:check"
                                      width="1rem"
                                      height="1rem"
                                    />
                                  </div>
                                )}
                              </button>
                            ))}
                        </div>

                        {active?.[index] && filter?.label === "Giá" && (
                          <div className="flex flex-col gap-4 p-4 bg-white rounded-lg">
                            <div className="flex justify-between gap-2 text-sm">
                              <p>{formatCurrency(userMinPrice)}</p>
                              <p>{formatCurrency(userMaxPrice)}</p>
                            </div>

                            <Slider
                              min={Number(minPrice)}
                              max={Number(maxPrice)}
                              value={[
                                Number(userMinPrice),
                                Number(userMaxPrice),
                              ]}
                              onChange={(e, newValue) => {
                                setUserMinPrice(Number(newValue[0]));
                                setUserMaxPrice(Number(newValue[1]));
                              }}
                              sx={{
                                color: "#1E40AF",
                                height: 8,
                                "& .MuiSlider-thumb": {
                                  width: 20,
                                  height: 20,
                                },
                                "& .MuiSlider-rail": {
                                  height: 8,
                                },
                                "& .MuiSlider-track": {
                                  height: 8,
                                },
                              }}
                            />

                            <div className="flex gap-2">
                              <button
                                className="w-[50%] bg-blue-200 p-2 rounded-lg"
                                onClick={() => {
                                  handleToggleHidden(index, setHidden);
                                  handleToggleActive(index, setActive);
                                }}
                              >
                                Đóng
                              </button>

                              <button
                                className="w-[50%] bg-main text-white rounded-lg p-2"
                                onClick={() => {
                                  const isDefaultRange =
                                    userMinPrice === Number(minPrice) &&
                                    userMaxPrice === Number(maxPrice);

                                  // Gắn giá trị bộ lọc giá
                                  const updatedFilters = {
                                    ...(selectedFilters || {}),
                                    Giá: isDefaultRange
                                      ? {
                                          minPrice: minPrice,
                                          maxPrice: maxPrice,
                                        } // Dùng giá trị mặc định
                                      : {
                                          minPrice: userMinPrice,
                                          maxPrice: userMaxPrice,
                                        }, // Dùng giá trị tùy chỉnh
                                  };

                                  setSelectedFilters(updatedFilters);

                                  // Đảm bảo label luôn active
                                  setActive((prev) => ({
                                    ...prev,
                                    [index]: true,
                                  }));

                                  // Ẩn modal sau khi áp dụng
                                  handleToggleHidden(index, setHidden);
                                  handleToggleActive(index, setActive);
                                  console.log(
                                    "Kết quả bộ lọc:",
                                    updatedFilters
                                  );
                                }}
                              >
                                Xem kết quả
                              </button>
                            </div>
                          </div>
                        )}

                        {activeChild[index] && (
                          <div className="flex gap-2">
                            <button
                              className="w-[50%] bg-blue-200 p-2 rounded-lg"
                              onClick={() => {
                                handleToggleHidden(index, setHidden);
                                handleToggleActive(index, setActive);
                              }}
                            >
                              Đóng
                            </button>
                            <button
                              className="w-[50%] bg-main text-white rounded-lg p-2"
                              onClick={() =>
                                handleApplyFilters(
                                  index,
                                  userMinPrice,
                                  userMaxPrice,
                                  minPrice,
                                  maxPrice,
                                  selectedFilters,
                                  setSelectedFilters,
                                  setActive,
                                  setHidden
                                )
                              }
                            >
                              Xem kết quả
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
        {Object.keys(selectedFilters).length > 0 && (
          <div>
            <h1 className="text-[20px] font-semibold">Đang lọc theo</h1>
            <div className="flex flex-wrap gap-2 text-main">
              {Object.entries(selectedFilters).map(([key, value]) => (
                <button
                  onClick={() => removeLabel(key)}
                  key={key}
                  className="flex   justify-center items-center gap-2 bg-gray-200 p-2 rounded-lg outline outine-main"
                >
                  <span>
                    {" "}
                    <Icon
                      icon="clarity:remove-line"
                      width="1rem"
                      height="1rem"
                    />
                  </span>
                  <span className="flex m-h-[24px]">
                    <span>{key}: </span>
                    <span className="flex ">
                      {Array.isArray(value)
                        ? value.join(", ")
                        : `${formatCurrency(value.minPrice)} - ${formatCurrency(
                            value.maxPrice
                          )}`}
                    </span>
                  </span>
                </button>
              ))}
              <button
                onClick={() => resetSelectedFilters()}
                className="flex justify-center items-center gap-2 bg-gray-200 p-2 rounded-lg  outline outine-main"
              >
                <Icon icon="clarity:remove-line" width="1rem" height="1rem" />
                <span>Bỏ chọn tất cả</span>
              </button>
            </div>
          </div>
        )}
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
