import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Person from "../../../components/Person";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { update, userOrder } from "../../../redux/slices/order";
import { FiCloudLightning } from "react-icons/fi";
import { handleToast } from "../../../ultils/toast";

export default function Order() {
  const [activeTab, setActiveTab] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const dispatch = useDispatch();
  const [customerData, setCustomerData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const status = useSelector((state) => state.auth.statusGetMe);
  const data = useSelector((state) => state.auth.data.rs);
  const satusOrder = useSelector((state) => state.order.statusUserOrder);
  const dataOrder = useSelector((state) => state.order.data);

  useEffect(() => {
    dispatch(userOrder());
  }, [dispatch]);

  useEffect(() => {
    if (status === "success") {
      setCustomerData(data);
    }
  }, [status, data]);

  useEffect(() => {
    if (satusOrder === "success" && Array.isArray(dataOrder)) {
      setOrderData(
        dataOrder?.map((item) => ({
          _id: item?._id,
          id: item?.SKU,
          date: new Date(item?.date).toLocaleDateString("vi-VN"),
          total: `${item.total.toLocaleString()} VND`,
          status: item?.status,
          products: item?.products?.map((product) => ({
            name: product?.pid?.name,
            image: product?.pid?.thumbnail,
            quantity: product?.quantity,
            price: `${product?.pid?.price.toLocaleString()} VND`,
            fex: `${item?.shippingFee.toLocaleString()} VND`,
            total: `${item?.total.toLocaleString()} VND`,
          })),
        }))
      );
    }
  }, [satusOrder, dataOrder]);

  const tabs = [
    { id: "all", name: "Tất cả" },
    { id: "Processing", name: "Đang chờ xử lý" },
    { id: "Đã giao hàng", name: "Đã giao hàng" },
    { id: "Đã nhận hàng", name: "Đã nhận hàng" },
    { id: "Canceled", name: "Đã hủy" },
    { id: "Success", name: "Thành công" },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return `bg-blue-600`;
      case "Processing":
        return `bg-orange-600`;
      case "Shipping":
        return `bg-purple-600`;
      case "Delivered":
        return `bg-gray-600`;
      case "Cancelled":
        return `bg-red-600`;
      case "Success":
        return `bg-green-600`;
      default:
        return "";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "Pending":
        return "Đang chờ xử lý";
      case "Processing":
        return "Đang xử lý";
      case "Shipping":
        return "Đang vận chuyển";
      case "Delivered":
        return "Đã giao hàng";
      case "Cancelled":
        return "Đã hủy";
      case "Success":
        return "Thành công";
      default:
        return status;
    }
  };

  const renderContent = () => {
    const filteredData =
      activeTab === "all"
        ? orderData
        : orderData.filter((item) => item.status === activeTab);

    if (filteredData.length === 0) {
      return <p className="text-center py-4">Đơn hàng trống</p>;
    }

    const hanldeDelete = (index) => {
      dispatch(
        update({
          orderId: index._id,
          data: {
            status: "Cancelled",
          },
        })
      ).then((i) => {
        if (i.type === "orders/updateStatus/fulfilled") {
          handleToast("success", "Hủy đơn thành công");
          dispatch(userOrder());
        }
      });
    };

    return (
      <table className="min-w-full divide-y divide-gray-200 text-center">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Mã đơn
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ngày đặt
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Tổng tiền
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Trạng thái
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Hành động
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 overflow-x-scroll">
          {filteredData.map((item) => (
            <React.Fragment key={item.id}>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.total}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    className={`block p-2 rounded-lg text-white w-full ${getStatusClass(
                      item.status
                    )}`}
                  >
                    {getStatusText(item.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex justify-center ">
                  <button
                    onClick={() =>
                      setExpandedOrder(
                        expandedOrder === item.id ? null : item.id
                      )
                    }
                  >
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{ rotate: expandedOrder === item.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex justify-center"
                    >
                      <Icon
                        icon="humbleicons:chevron-down"
                        width="2rem"
                        height="2rem"
                      />
                    </motion.div>
                    {expandedOrder === item.id ? "Ẩn" : "Xem chi tiết"}
                  </button>
                </td>
              </tr>
              <AnimatePresence>
                {expandedOrder === item.id && (
                  <motion.tr
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td colSpan="5" className="px-6 py-4 text-left">
                      <div className="space-y-4">
                        {item.products.map((product, index) => (
                          <div key={index} className="flex space-x-4">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-16 h-16 object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="text-sm font-medium">
                                {product.name}
                              </h4>
                              <p className="text-sm text-gray-500">
                                Số lượng: {product.quantity}
                              </p>
                              <p className="text-sm text-gray-500">
                                Giá: {product.price}
                              </p>
                              <p className="text-sm text-gray-500">
                                Phí vận chuyển: {product.fex}
                              </p>
                              <p className="text-sm text-gray-500">
                                Thành tiền: {product.total}
                              </p>
                            </div>
                          </div>
                        ))}
                        <div className="mt-4">
                          <button
                            onClick={() => hanldeDelete(item)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg"
                          >
                            Hủy đơn hàng
                          </button>
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <Person name={customerData.name} phone={customerData.phone} role="Vip" />
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <li key={tab.id} className="me-2">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`inline-block pb-3 mr-3 border-b-2 rounded-t-lg min-w-[100px] ${
                  activeTab === tab.id
                    ? "text-blue-600 border-blue-600 dark:text-blue-500 dark:border-blue-500"
                    : "border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
              >
                {tab.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="overflow-x-auto">{renderContent()}</div>
    </div>
  );
}
