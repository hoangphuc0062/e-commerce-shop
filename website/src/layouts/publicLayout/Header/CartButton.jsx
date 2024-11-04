import { useState } from "react";
import { Icon } from "@iconify/react";
import { Box, List, ListItem, Divider, Drawer, Checkbox } from "@mui/material";
import { Link } from "react-router-dom";
import EmptyCart from "../../../components/EmptyCart";

// Example placeholder image URL for the empty cart illustration
const emptyCartImage =
  "https://firebasestorage.googleapis.com/v0/b/e-commerce-shop-443f6.appspot.com/o/cart%2Fno-cart-1.png?alt=media&token=dc3dc5e6-ecd8-4b2d-8bc9-e5f6fd887b92";

function CartButton({ data = [] }) {
  const [state, setState] = useState({ right: false });
  const [cartData, setCartData] = useState(data);
  const [checkedItems, setCheckedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const handleCheckboxChange = (index) => {
    setCheckedItems((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setCheckedItems([]);
    } else {
      setCheckedItems(cartData.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  const handleIncrement = (index) => {
    setCartData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (index) => {
    setCartData((prev) =>
      prev.map((item, i) =>
        i === index && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleUpdateQuantity = () => {
    const updatedCartData = cartData.map((item, index) =>
      checkedItems.includes(index) ? { ...item, quantity: item.quantity } : item
    );
    setCartData(updatedCartData);
    setCheckedItems([]);
    setSelectAll(false);
  };

  const handleDelete = () => {
    const newData = cartData.filter(
      (_, index) => !checkedItems.includes(index)
    );
    setCartData(newData);
    setCheckedItems([]);
    setSelectAll(false);
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
              Giỏ hàng của bạn (
              {cartData.reduce((acc, cur) => acc + cur.quantity, 0)})
            </h1>
          </ListItem>
          <Divider />
        </List>
        {cartData.length === 0 ? (
          <EmptyCart emptyCartImage={emptyCartImage} to="/" />
        ) : (
          <>
            <List>
              <div>
                <Checkbox checked={selectAll} onChange={handleSelectAll} />
                <span className="ml-2">Chọn tất cả</span>
              </div>

              {cartData.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <Checkbox
                    checked={checkedItems.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <img
                        src={item.image}
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
                          {item.priceSale.toLocaleString()} VND
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center border border-gray-300 rounded w-28 justify-between">
                      <button
                        onClick={() => handleDecrement(index)}
                        className="text-lg px-3 focus:outline-none hover:bg-gray-200"
                      >
                        -
                      </button>
                      <input
                        className="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 
                        [&::-webkit-inner-spin-button]:appearance-none 
                        [&::-webkit-outer-spin-button]:appearance-none dark:text-white
                        border-l border-r text-center
                        "
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
                        onClick={() => handleIncrement(index)}
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
                    {cartData
                      .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
                      .toLocaleString()}{" "}
                    VND
                  </p>
                </div>
              </ListItem>
              {checkedItems.length > 0 && (
                <div className="flex gap-1">
                  <button
                    className="w-full bg-indigo-600 text-white p-2 rounded-lg mr-2 "
                    onClick={handleUpdateQuantity}
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
            {cartData.length || 0}
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

export default CartButton;
