import Heading from "../Heading/Heading";
import "./ProductInfo.css";
const ProductInfo = () => {
  return (
    <div className="p-4 border rounded-lg shadow-md w-full md:w-[50%] overflow-y-auto max-h-[250px] scrollbar-hide">
      <Heading title="Thông tin sản phẩm" />
      <ul className="mb-4 list-disc list-inside">
        <li>Mới, đầy đủ phụ kiện từ nhà sản xuất</li>
        <li>Điện thoại thông minh</li>
        <li>Cấp truyền dữ liệu</li>
        <li>Que lấy sim</li>
        <li>* Galaxy S24 Ultra không bao gồm củ sạc.</li>
      </ul>
      <div className="mb-4">
        <p className="text-gray-700">
          Bảo hành 12 tháng tại trung tâm bảo hành Chính hãng.
        </p>
        <p className="text-gray-700">
          1 đổi 1 trong 30 ngày nếu có lỗi phần cứng từ nhà sản xuất.
        </p>
      </div>
      <p className="text-gray-700">Giá sản phẩm đã bao gồm VAT</p>
    </div>
  );
};

export default ProductInfo;
