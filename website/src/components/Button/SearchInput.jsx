import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySearch } from "../../redux/slices/product";
import { debounce } from "lodash";
import { Link } from "react-router-dom";

export const SearchInput = () => {
  const dispatch = useDispatch();
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const resultsRef = useRef();
  const data = useSelector(
    (state) => state.product?.dataSearch?.products || []
  );

  useEffect(() => {
    dispatch(
      getProductsBySearch({
        limit: 500,
        fields: "name,thumbnail,category,brand,slug",
      })
    );
  }, [dispatch]);

  const handleSearchChange = useMemo(() => {
    return debounce((query) => {
      setLoading(true);
      if (query.trim().length === 0) {
        setResults([]);
        setLoading(false);
        return;
      }

      const re = new RegExp(query, "i");
      const filteredResults = Array.isArray(data)
        ? data.filter((item) => re.test(item.name))
        : [];
      setResults(filteredResults);
      setLoading(false);
    }, 300);
  }, [data]);

  const onInputChange = (e) => {
    const query = e.target.value;
    setValue(query);
    handleSearchChange(query);
  };

  const handleClickOutside = (e) => {
    if (resultsRef.current && !resultsRef.current.contains(e.target)) {
      setResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleClickLink = () => {
    setValue("");
    setResults([]);
  };
  return (
    <div className="relative lg:w-5/6">
      <form className="w-full" onSubmit={(e) => e.preventDefault()}>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-2 ps-10 md:ps-10 md:p-4 text-sm text-gray-900 border 
      border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-blue-500 focus:border-blue-500 
      dark:placeholder-gray-400 dark:text-white"
            placeholder="Bạn muốn mua gì?"
            value={value}
            onChange={onInputChange}
            aria-expanded={results.length > 0}
          />
        </div>
        {loading && (
          <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-md text-center">
            <p className="p-2 text-gray-500">Loading...</p>
          </div>
        )}
        {!loading && results.length > 0 && (
          <ul
            ref={resultsRef}
            className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-md 
            max-h-[800px] overflow-y-auto
            text-gray-900 dark:text-white
            cursor-pointer
            "
            role="listbox"
          >
            {results.map((result, index) => (
              <li
                key={index}
                className="p-2 border-b border-gray-200 hover:bg-gray-100"
              >
                <Link
                  to={`${result?.category?.slug}/${result?.brand?.slug}/${result?.slug}`}
                  className="flex"
                  onClick={handleClickLink}
                >
                  <img
                    src={result.thumbnail}
                    alt={result.name}
                    className="w-16 h-16"
                  />
                  <div className="flex flex-col">
                    <span className="ml-4">{result.name}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {!loading && results.length === 0 && value && (
          <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-md text-center">
            <p className="p-2 text-gray-500">không có sản phẩm này</p>
          </div>
        )}
      </form>
    </div>
  );
};
