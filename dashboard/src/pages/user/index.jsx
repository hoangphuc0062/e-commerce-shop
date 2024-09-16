import { useState } from "react";
import ReusableTableUser from "./../../components/table/ReusableTableUser";

export default function UserPage() {
  const [selectedData, setSelectedData] = useState(null);

  const initialData = [
    {
      id: 1011,
      name: "John Doe",
      address: "28 ywang",
      email: "thainn@gamil.com",
      sdt: "0987654321",
      sex: "Nam",
      membership: "Student - Member",
      totalAmount: "2.000.000 vnd",
      status: "Active",
      cart: [
        {
          productName: "Watch XYZ",
          quantity: 2,
          price: "1.000.000 VND",
          image: "https://via.placeholder.com/100",
        },
        {
          productName: "Bracelet ABC",
          quantity: 1,
          price: "500.000 VND",
          image: "https://via.placeholder.com/100",
        },
      ],
    },
    {
      id: 1012,
      name: "Jane Smith",
      address: "12 Ngo Quyen",
      email: "jane.smith@example.com",
      sdt: "0912345678",
      sex: "Nữ",
      membership: "VIP - Member",
      totalAmount: "5.500.000 VND",
      status: "Active",
      cart: [
        {
          productName: "Necklace DEF",
          quantity: 1,
          price: "3.000.000 VND",
          image: "https://via.placeholder.com/100",
        },
        {
          productName: "Earrings GHI",
          quantity: 1,
          price: "2.500.000 VND",
          image: "https://via.placeholder.com/100",
        },
      ],
    },
    {
      id: 1013,
      name: "Michael Brown",
      address: "45 Tran Phu",
      email: "michael.brown@example.com",
      sdt: "0923456789",
      sex: "Nam",
      membership: "Regular - Member",
      totalAmount: "1.500.000 VND",
      status: "Inactive",
      cart: [
        {
          productName: "Sunglasses JKL",
          quantity: 1,
          price: "1.500.000 VND",
          image: "https://via.placeholder.com/100",
        },
      ],
    },
    {
      id: 1014,
      name: "Emily Davis",
      address: "23 Le Loi",
      email: "emily.davis@example.com",
      sdt: "0934567890",
      sex: "Nữ",
      membership: "Premium - Member",
      totalAmount: "4.000.000 VND",
      status: "Active",
      cart: [
        {
          productName: "Handbag MNO",
          quantity: 1,
          price: "2.000.000 VND",
          image: "https://via.placeholder.com/100",
        },
        {
          productName: "Watch PQR",
          quantity: 1,
          price: "2.000.000 VND",
          image: "https://via.placeholder.com/100",
        },
      ],
    },
    {
      id: 1015,
      name: "Chris Johnson",
      address: "67 Nguyen Trai",
      email: "chris.johnson@example.com",
      sdt: "0945678901",
      sex: "Nam",
      membership: "Student - Member",
      totalAmount: "1.000.000 VND",
      status: "Inactive",
      cart: [
        {
          productName: "Belt STU",
          quantity: 2,
          price: "500.000 VND",
          image: "https://via.placeholder.com/100",
        },
      ],
    },
  ];

  const columns = [
    { label: "Id", field: "id" },
    { label: "Họ và tên", field: "name" },
    { label: "Địa chỉ", field: "address" },
    { label: "Email", field: "email" },
    { label: "Số điện thoại", field: "sdt" },
    { label: "Giới tính", field: "sex" },
    { label: "Loại thành viên", field: "membership" },
    { label: "Tổng tiền", field: "totalAmount" },
    { label: "Trạng thái", field: "status" },
    {
      label: "Hành động",
      field: "actions",
      render: (user) => (
        <button
          className="btn btn-primary"
          onClick={() => setSelectedData(user)}
        >
          Xem giỏ hàng
        </button>
      ),
    },
  ];

  const handleDelete = (id) => {
    console.log("Delete", id);
  };

  const handleEdit = (id) => {
    console.log("Edit", id);
  };
  const handleCloseCart = () => {
    setSelectedData(null); // Đặt lại selectedData về null để tắt giỏ hàng
  };
  return (
    <>
      <ReusableTableUser
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        data={initialData}
        columns={columns}
      />

      {selectedData && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          maxWidth: '600px',
          border: '1px solid #ccc',
          padding: '40px',
          backgroundColor: 'white',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          zIndex: 1000,
          overflowY: 'auto',
          borderRadius: '4px',
        }}>
          <div>
            <h5 style={{ textAlign: 'center', margin: '20px' }}>Thông tin giỏ hàng của {selectedData.name}</h5>
            {selectedData.cart && selectedData.cart.length > 0 ? (
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {selectedData.cart.map((item, index) => (
                  <li key={index} style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                    <img
                      src={item.image}
                      alt={item.productName}
                      style={{ width: '50px', height: '50px', marginRight: '10px' }}
                    />
                    <span>{item.productName}</span> -
                    <span> Số lượng: {item.quantity}</span> -
                    <span> Giá: {item.price}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Không có sản phẩm trong giỏ hàng.</p>
            )}
            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-secondary" onClick={handleCloseCart}>
                Ẩn giỏ hàng
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
