import { useState, useCallback, useRef, useEffect } from "react";
import icons from "../../ultils/icon";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../redux/slices/post";
import { Link } from "react-router-dom";

const GroupInputForum = () => {
  const { AiOutlineSearch } = icons;
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.data);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");
  const timeoutRef = useRef();
  const resultsRef = useRef();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const handleSearchChange = useCallback(
    (e) => {
      const query = e.target.value;
      setValue(query);
      clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        if (query.length === 0) {
          setResults([]);
          return;
        }

        const re = new RegExp(query, "i");
        const filteredResults = Array.isArray(posts)
          ? posts.filter((item) => re.test(item.postTitle))
          : [];
        setResults(filteredResults);
      }, 300);
    },
    [posts]
  );

  const handleClickLink = () => {
    setValue("");
    setResults([]);
  };

  const handleClickOutside = (e) => {
    if (resultsRef.current && !resultsRef.current.contains(e.target)) {
      setResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      clearTimeout(timeoutRef.current);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-1/2">
      <form
        className="flex items-center w-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          value={value}
          onChange={handleSearchChange}
          placeholder="Tìm kiếm"
          className="bg-white rounded-full py-2 px-4 pr-10 w-full focus:outline-none"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 sm:p-2 text-lg sm:text-xl"
        >
          <AiOutlineSearch className="text-gray-400" />
        </button>
      </form>

      {results.length > 0 && (
        <ul
          ref={resultsRef}
          className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-md"
        >
          {results.map((result, index) => (
            <li
              key={index}
              className="p-2 border-b border-gray-200 hover:bg-gray-100"
            >
              <Link
                to={`${result.slug}`}
                className="flex"
                onClick={handleClickLink}
              >
                <img
                  src={result.thumbnail}
                  alt={result.postTitle}
                  className="w-16 h-16"
                />
                <div className="flex flex-col">
                  <span className="ml-4">{result.postTitle}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GroupInputForum;
