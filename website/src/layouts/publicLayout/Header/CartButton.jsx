import { useState, useMemo, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import { Box, List, ListItem, Divider, Drawer, Checkbox } from "@mui/material";
import { Link } from "react-router-dom";
import EmptyCart from "../../../components/EmptyCart";
import { useDispatch } from "react-redux";
import { deleteCart, getCart, updateCart } from "../../../redux/slices/auth";
import { handleToast } from "../../../ultils/toast";

const emptyCartImage =
  "https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-443f6.appspot.com/o/cart%2Fno-cart-1.png?alt=media&token=dc3dc5e6-ecd8-4b2d-8bc9-e5f6fd887b92";

function CartButton({ data }) {
  const [state, setState] = useState({ right: false });
  const [cartData, setCartData] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setCartData(data);
    setCheckedItems(data.map((_, index) => index));
  }, [data]);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    )
      return;
    setState({ ...state, [anchor]: open });
  };

  const handleCheckboxChange = (index) => {
    setCheckedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setCheckedItems(cartData.map((_, index) => index));
    } else {
      setCheckedItems([]);
    }
    setSelectAll(!selectAll);
  };

  const updateQuantity = (index, amount) => {
    const newQuantity = cartData[index].quantity + amount;
    const newCartData = cartData.map((item, i) => {
      if (i === index) return { ...item, quantity: newQuantity };
      return item;
    });
    setCartData(newCartData);
  };

  const handleDelete = useCallback(() => {
    const productIds = checkedItems.map((index) => cartData[index].productId);
    const attributeIds = checkedItems.map(
      (index) => cartData[index].attributeValue.id[0]
    );
    const itemsToDelete = productIds.map((id) => ({
      productId: id,
      attributeId: attributeIds,
    }));
    dispatch(deleteCart(itemsToDelete)).then((result) => {
      if (result.type === "auth/deleteCart/fulfilled") {
        handleToast("success", "Xoá sản phẩm thành công");
        dispatch(getCart());
      }
    });
    setCheckedItems([]);
    setSelectAll(false);
  }, [dispatch, checkedItems, cartData]);

  const totalAmount = useMemo(() => {
    return cartData.reduce((total, item, index) => {
      if (checkedItems.includes(index))
        return total + item.price * item.quantity;
      return total;
    }, 0);
  }, [cartData, checkedItems]);

  const handleUpdateCart = () => {
    const updatedItems = checkedItems.map((index) => {
      const item = cartData[index];
      return {
        productId: item.productId,
        attributeId: item.attributeValue.id,
        quantity: item.quantity,
      };
    });
    dispatch(updateCart(updatedItems)).then((result) => {
      if (result.type === "auth/updateCart/fulfilled") {
        handleToast("success", "Cập nhật giỏ hàng thành công");
        dispatch(getCart());
        setCheckedItems([]);
        setSelectAll(false);
      }
    });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 450,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
      role="presentation"
    >
      <Box sx={{ overflowY: "auto", flex: 1, padding: "16px" }}>
        <List>
          <ListItem>
            <Icon
              icon="carbon:shopping-bag"
              width={30}
              style={{ color: " #1e40b0" }}
            />
            <h1 className="font-bold text-main">
              Giỏ hàng của bạn ({cartData?.length > 0 ? cartData.length : 0})
            </h1>
          </ListItem>
          <Divider />
        </List>
        {cartData?.length === 0 ? (
          <EmptyCart emptyCartImage={emptyCartImage} to="/" />
        ) : (
          <>
            <List>
              <div>
                <Checkbox checked={selectAll} onChange={handleSelectAll} />
                <span className="ml-2">Chọn tất cả</span>
              </div>

              {cartData?.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <Checkbox
                    checked={checkedItems.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <img
                        src={item.thumbnail}
                        alt={item.name}
                        className="w-20 h-20 object-cover"
                      />
                      <div className="ml-2">
                        <p className="font-bold text-base text-gray-800">
                          {item.name}
                        </p>
                        <p className="text-indigo-600 font-semibold text-sm mt-1">
                          {item.price.toLocaleString()} VND
                        </p>
                        <p className="text-gray-400 text-xs line-through mt-1">
                          {item?.attribute?.price.toLocaleString()} VND
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center border border-gray-300 rounded w-28 justify-between">
                      <button
                        onClick={() => updateQuantity(index, -1)}
                        className="text-lg px-3 focus:outline-none hover:bg-gray-200"
                      >
                        -
                      </button>
                      <input
                        className="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 
                        [&::-webkit-inner-spin-button]:appearance-none 
                        [&::-webkit-outer-spin-button]:appearance-none dark:text-white
                        border-l border-r text-center"
                        style={{ MozAppearance: "textfield" }}
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => {
                          const value = Math.max(
                            1,
                            parseInt(e.target.value) || 1
                          );
                          setCartData((prev) =>
                            prev.map((item, i) =>
                              i === index ? { ...item, quantity: value } : item
                            )
                          );
                        }}
                      />
                      <button
                        onClick={() => updateQuantity(index, 1)}
                        className="text-lg px-3 focus:outline-none hover:bg-gray-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              <ListItem>
                <div className="flex justify-between w-full font-bold">
                  <p>Tổng cộng:</p>
                  <p className="text-main">
                    {totalAmount.toLocaleString()} VND
                  </p>
                </div>
              </ListItem>
              {checkedItems.length > 0 && (
                <div className="flex gap-1">
                  <button
                    className="w-full bg-indigo-600 text-white p-2 rounded-lg mr-2"
                    onClick={handleUpdateCart}
                  >
                    Cập nhật
                  </button>

                  <button
                    className="w-full bg-red-600 text-white p-2 rounded-lg"
                    onClick={handleDelete}
                  >
                    Xoá
                  </button>
                </div>
              )}
            </List>
          </>
        )}
      </Box>
      <Divider />
      {cartData.length > 0 && (
        <Box sx={{ padding: "16px" }}>
          <ListItem>
            <Link
              to="/cart"
              className="w-full bg-indigo-600 text-white p-2 rounded-lg text-center"
            >
              Thanh toán
            </Link>
          </ListItem>
        </Box>
      )}
    </Box>
  );

  return (
    <div>
      <button
        className="flex items-center justify-center text-[12px] w-[80px] hover:bg-hv p-2 rounded-lg"
        onClick={toggleDrawer("right", true)}
      >
        <div className="flex items-center justify-center relative">
          <Icon icon="carbon:shopping-bag" width="2rem" height="2rem" />
          <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-1 text-[10px]">
            {cartData?.length || 0}
          </span>
        </div>
        <p className="line-clamp-2">Giỏ hàng</p>
      </button>
      <Drawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
      >
        {list("right")}
      </Drawer>
    </div>
  );
}

CartButton.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      productId: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      attribute: PropTypes.shape({
        value: PropTypes.string,
        price: PropTypes.number,
      }),
    })
  ).isRequired,
};

export default CartButton;
