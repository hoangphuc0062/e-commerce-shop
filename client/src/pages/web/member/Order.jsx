import { useState } from "react";
import { Icon } from "@iconify/react";
import Person from "../../../components/Member/Person";
import { motion, AnimatePresence } from "framer-motion";

const Order = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const tabs = [
    { id: "all", name: "Tất cả" },
    { id: "Pending", name: "Đang chờ xử lý" },
    { id: "Shipped", name: "Đã giao hàng" },
    { id: "Delivered", name: "Đã nhận hàng" },
    { id: "Cancelled", name: "Đã hủy" },
  ];

  const data = [
    {
      id: 1,
      date: "2023-01-01",
      total: "100,000 VND",
      status: "Pending",
      details: "Chi tiết 1",
      products: [
        {
          image: "image1.jpg",
          quantity: 1,
          price: "50,000 VND",
          total: "50,000 VND",
        },
        {
          image: "image2.jpg",
          quantity: 1,
          price: "50,000 VND",
          total: "50,000 VND",
        },
      ],
    },
    {
      id: 2,
      date: "2023-01-02",
      total: "200,000 VND",
      status: "Pending",
      details: "Chi tiết 2",
      products: [
        {
          image: "image3.jpg",
          quantity: 2,
          price: "100,000 VND",
          total: "200,000 VND",
        },
      ],
    },
    {
      id: 3,
      date: "2023-01-03",
      total: "300,000 VND",
      status: "Shipped",
      details: "Chi tiết 3",
      products: [
        {
          image: "image4.jpg",
          quantity: 3,
          price: "100,000 VND",
          total: "300,000 VND",
        },
      ],
    },
    {
      id: 4,
      date: "2023-01-04",
      total: "400,000 VND",
      status: "Delivered",
      details: "Chi tiết 4",
      products: [
        {
          image: "image5.jpg",
          quantity: 4,
          price: "100,000 VND",
          total: "400,000 VND",
        },
      ],
    },
    {
      id: 5,
      date: "2023-01-05",
      total: "500,000 VND",
      status: "Cancelled",
      details: "Chi tiết 5",
      products: [
        {
          image: "image6.jpg",
          quantity: 5,
          price: "100,000 VND",
          total: "500,000 VND",
        },
      ],
    },
  ];
  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return `bg-blue-600`;
      case "Shipped":
        return `bg-yellow-600`;
      case "Delivered":
        return `bg-gray-600`;
      case "Cancelled":
        return `bg-red-600`;
      default:
        return "";
    }
  };
  const renderContent = () => {
    const filteredData =
      activeTab === "all"
        ? data
        : data.filter((item) => item.status === activeTab);

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
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredData.map((item) => (
            <>
              <tr key={item.id}>
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
                    className={` block p-2 rounded-lg text-white  w-full ${getStatusClass(
                      item.status
                    )}`}
                  >
                    {item.status}
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
                          <div key={index} className="flex  space-x-4">
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
                                Thành tiền: {product.total}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <Person name="Phúc" phone="0773440062" role="Vip" />
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <li key={tab.id} className="me-2">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
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
      <div className="p-4">{renderContent()}</div>
    </div>
  );
};

export default Order;
