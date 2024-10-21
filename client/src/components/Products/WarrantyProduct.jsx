const WarrantyProduct = () => {
  return (
    <div>
      <div className="p-4 bg-card text-card-foreground rounded-lg shadow-md w-full mt-4 overflow-y-auto scrollbar-hide">
        <h2 className="text-lg font-semibold mb-2">
          Bảo vệ sản phẩm toàn diện với dịch vụ bảo hành mở rộng
        </h2>
        <p className="text-muted-foreground mb-4">
          (Khách hàng đăng ký thông tin để được hỗ trợ tư vấn và thanh toán tại
          cửa hàng nhanh nhất, số tiền phải thanh toán chưa bao gồm giá trị của
          gói bảo hành mở rộng)
        </p>
        <div className="border border-border rounded-lg p-4 mb-4 ">
          <label className="flex items-center mb-2">
            <input type="radio" name="warranty" className="mr-2" />
            <span>
              1 đổi 1 VIP 6 tháng: Đổi máy mới tương đương khi có lỗi từ NSX
              trong 6 tháng
            </span>
          </label>
          <span className="text-lg font-bold text-main">1.300.000 đ</span>
          <a href="#" className="text-primary hover:underline hover:text-main">
            Xem chi tiết
          </a>
        </div>
        <div className="border border-border rounded-lg p-4 mb-4">
          <label className="flex items-center mb-2">
            <input type="radio" name="warranty" className="mr-2" />
            <span>
              S24+ 12 tháng: Đổi sản phẩm tương đương hoặc miễn phí chi phí sửa
              chữa nếu có lỗi của NSX khi hết hạn bảo hành trong 12 tháng
            </span>
          </label>
          <span className="text-lg font-bold text-main">1.600.000 đ</span>
          <a href="#" className="text-primary hover:underline hover:text-main">
            Xem chi tiết
          </a>
        </div>
        <div className="border border-border rounded-lg p-4 ">
          <label className="flex items-center mb-2">
            <input type="radio" name="warranty" className="mr-2" />
            <span>
              1 đổi 1 VIP 12 tháng: Đổi máy mới tương đương khi có lỗi từ NSX
              trong 12 tháng
            </span>
          </label>
          <span className="text-lg font-bold text-main">1.800.000 đ</span>
          <a href="#" className="text-primary hover:underline hover:text-main">
            Xem chi tiết
          </a>
        </div>
      </div>
    </div>
  );
};

export default WarrantyProduct;
