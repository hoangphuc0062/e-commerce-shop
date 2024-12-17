import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByParams } from "./../../../redux/slices/product";
import { debounce } from "lodash";
import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CircularProgress,
  Typography,
  Paper,
} from "@mui/material";
import ProductSection from "./ProductSection";
import Chechoau from "./chechoau";

export default function CreateOrderByStaff() {
  const dispatch = useDispatch();
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const resultsRef = useRef();
  const [isChechoau, setIsChechoau] = useState(false);

  const data = useSelector((state) => state.product.data.products);

  // Fetch products on mount
  useEffect(() => {
    dispatch(
      getProductsByParams({
        limit: 500,
        fields: "name,thumbnail,category,brand,slug",
      })
    );
  }, [dispatch]);

  // Debounced search handler
  const handleSearchChange = useMemo(
    () =>
      debounce((query) => {
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
      }, 300),
    [data]
  );

  const onInputChange = (e) => {
    const query = e.target.value;
    setValue(query);
    handleSearchChange(query);
  };

  // Close results dropdown when clicking outside
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

  const handleProductSelect = (product) => {
    setSelectedProducts((prev) => [...prev, product]);
    setValue("");
    setResults([]);
  };

  const handleDeleteProduct = (productId) => {
    setSelectedProducts((prev) =>
      prev.filter((product) => product.productId !== productId)
    );
    setIsChechoau(true);
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          backgroundColor: "white",
          p: 2,
        }}
      >
        {/* Search Input */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Bạn muốn mua gì?"
          value={value}
          onChange={onInputChange}
          InputProps={{
            startAdornment: (
              <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>
                <svg
                  className="w-5 h-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M10.5 17a6.5 6.5 0 110-13 6.5 6.5 0 010 13z"
                  />
                </svg>
              </Box>
            ),
          }}
        />
        {/* Results Dropdown */}
        {loading && (
          <Paper
            sx={{
              position: "absolute",
              top: "100%",
              mt: 1,
              width: "100%",
              textAlign: "center",
              p: 2,
            }}
          >
            <CircularProgress size={24} />
          </Paper>
        )}
        {!loading && results.length > 0 && (
          <Paper
            ref={resultsRef}
            sx={{
              position: "absolute",
              top: "100%",
              mt: 1,
              width: "100%",
              maxHeight: 400,
              overflowY: "auto",
              zIndex: 10,
            }}
          >
            <List>
              {results.map((result, index) => (
                <ListItem
                  key={index}
                  onClick={() => handleProductSelect(result)}
                  sx={{ p: 1, cursor: "pointer" }}
                >
                  <ListItemAvatar>
                    <Avatar src={result.thumbnail} alt={result.name} />
                  </ListItemAvatar>
                  <ListItemText primary={result.name} />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
        {!loading && results.length === 0 && value && (
          <Paper
            sx={{
              position: "absolute",
              top: "100%",
              mt: 1,
              width: "100%",
              textAlign: "center",
              p: 2,
            }}
          ></Paper>
        )}
        {/* Selected Products */}
        <Box sx={{ mt: 2 }}>
          {selectedProducts.length === 0 ? (
            <Typography variant="body2" color="text.secondary"></Typography>
          ) : (
            <ProductSection
              products={selectedProducts}
              onDelete={handleDeleteProduct}
            />
          )}
        </Box>
      </Box>
      {/* Order Summary */}
      {isChechoau && (
        <Box sx={{ mt: 2, p: 2, backgroundColor: "white" }}>
          <Chechoau />
        </Box>
      )}
    </>
  );
}
