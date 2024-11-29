import React from "react";
import { Typography } from "@mui/material";

const InvoiceComponent = React.forwardRef(({ orderData, receivedAmount }, ref) => {
    // Function to safely format the number, returns empty string if the value is invalid
    const formatCurrency = (value) => {
        return value && !isNaN(value) ? value.toLocaleString() : "0";
    };

    const totalAmount = orderData.products.reduce(
        (total, product) => total + (product.price * product.quantity || 0),
        0
    );

    // Calculate the change (if any)
    const change = receivedAmount - totalAmount;

    return (
        <div ref={ref} style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>HÓA ĐƠN BÁN HÀNG</h2>

            <div style={{ marginBottom: 20 }}>
                <p><strong>Tên khách hàng:</strong> {orderData.customerName}</p>
                <p><strong>Số điện thoại:</strong> {orderData.phone}</p>
                <p><strong>Nhân viên xử lý:</strong> {orderData.staffName}</p>
                <p><strong>Vị trí cửa hàng:</strong> {orderData.storeLocation}</p>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 20 }}>
                <thead>
                    <tr style={{ backgroundColor: "#f4f4f4" }}>
                        <th style={{ border: "1px solid black", padding: 8, textAlign: "center" }}>Sản phẩm</th>
                        <th style={{ border: "1px solid black", padding: 8, textAlign: "center" }}>Biến thể</th>
                        <th style={{ border: "1px solid black", padding: 8, textAlign: "center" }}>Số lượng</th>
                        <th style={{ border: "1px solid black", padding: 8, textAlign: "center" }}>Giá</th>
                        <th style={{ border: "1px solid black", padding: 8, textAlign: "center" }}>Tổng</th>
                    </tr>
                </thead>
                <tbody>
                    {orderData.products.map((product, index) => (
                        <tr key={index}>
                            <td style={{ border: "1px solid black", padding: 8 }}>{product.productName}</td>
                            <td style={{ border: "1px solid black", padding: 8 }}>{product.variant || "Không có biến thể"}</td>
                            <td style={{ border: "1px solid black", padding: 8, textAlign: "center" }}>{product.quantity}</td>
                            <td style={{ border: "1px solid black", padding: 8, textAlign: "right" }}>
                                {formatCurrency(product.price)} VND
                            </td>
                            <td style={{ border: "1px solid black", padding: 8, textAlign: "right" }}>
                                {formatCurrency(product.price * product.quantity)} VND
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3 style={{ textAlign: "right", marginTop: 20 }}>
                <strong>Tổng cộng: </strong>{formatCurrency(totalAmount)} VND
            </h3>

            {/* Check if receivedAmount is valid */}
            <Typography variant="h6" style={{ textAlign: "right", marginTop: 10 }}>
                <strong>Số tiền nhận: </strong>{receivedAmount ? formatCurrency(receivedAmount) : "0"} VND
            </Typography>

            {/* Calculate and display the change */}
            <Typography variant="h6" style={{ textAlign: "right", marginTop: 10 }}>
                <strong>Số tiền hoàn lại: </strong>{formatCurrency(change)} VND
            </Typography>

            <p style={{ textAlign: "center", marginTop: 30 }}>
                <strong>Cảm ơn quý khách đã mua hàng!</strong>
            </p>
        </div>
    );
});

export default InvoiceComponent;
