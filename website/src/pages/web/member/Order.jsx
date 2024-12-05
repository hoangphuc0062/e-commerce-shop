import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import Person from "../../../components/Person";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

export default function Order() {
  const [activeTab, setActiveTab] = useState("all");
  const [expandedOrder, setExpandedOrder] = useState(null);

  const [customerData, setCustomerData] = useState([]);
  const status = useSelector((state) => state.auth.statusGetMe);
  const data = useSelector((state) => state.auth.data.rs);
  useEffect(() => {
    if (status === "success") {
      setCustomerData(data);
    }
  }, [status, data]);

  const tabs = [
    { id: "all", name: "Tất cả" },
    { id: "Đang chờ xử lý", name: "Đang chờ xử lý" },
    { id: "Đã giao hàng", name: "Đã giao hàng" },
    { id: "Đã nhận hàng", name: "Đã nhận hàng" },
    { id: "Đã hủy", name: "Đã hủy" },
  ];

  const data1 = [
    {
      id: 1,
      date: "2023-01-01",
      total: "100,000 VND",
      status: "Đang chờ xử lý",
      details: "Chi tiết 1",
      products: [
        {
          image: "image1.jpg",
          quantity: 1,
          price: "50,000 VND",
          total: "50,000 VND",
        },
      ],
    },
    // {
    //   id: 2,
    //   date: "2023-01-02",
    //   total: "200,000 VND",
    //   status: "Đang chờ xử lý",
    //   details: "Chi tiết 2",
    //   products: [
    //     {
    //       image: "image3.jpg",
    //       quantity: 2,
    //       price: "100,000 VND",
    //       total: "200,000 VND",
    //     },
    //   ],
    // },
    // {
    //   id: 3,
    //   date: "2023-01-03",
    //   total: "300,000 VND",
    //   status: "Đã giao hàng",
    //   details: "Chi tiết 3",
    //   products: [
    //     {
    //       image: "image4.jpg",
    //       quantity: 3,
    //       price: "100,000 VND",
    //       total: "300,000 VND",
    //     },
    //   ],
    // },
    // {
    //   id: 4,
    //   date: "2023-01-04",
    //   total: "400,000 VND",
    //   status: "Đã nhận hàng",
    //   details: "Chi tiết 4",
    //   products: [
    //     {
    //       image: "image5.jpg",
    //       quantity: 4,
    //       price: "100,000 VND",
    //       total: "400,000 VND",
    //     },
    //   ],
    // },
    // {
    //   id: 5,
    //   date: "2023-01-05",
    //   total: "500,000 VND",
    //   status: "Đã hủy",
    //   details: "Chi tiết 5",
    //   products: [
    //     {
    //       image: "image6.jpg",
    //       quantity: 5,
    //       price: "100,000 VND",
    //       total: "500,000 VND",
    //     },
    //   ],
    // },
  ];
  const getStatusClass = (status) => {
    switch (status) {
      case "Đang chờ xử lý":
        return `bg-blue-600`;
      case "Đã giao hàng":
        return `bg-yellow-600`;
      case "Đã nhận hàng":
        return `bg-gray-600`;
      case "Đã hủy":
        return `bg-red-600`;
      default:
        return "";
    }
  };
  const renderContent = () => {
    const filteredData =
      activeTab === "all"
        ? data1
        : data1.filter((item) => item.status === activeTab);

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
