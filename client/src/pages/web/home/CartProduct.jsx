import { GoArrowLeft } from "react-icons/go";
import { FaTrashAlt } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { useState } from "react";

const CartProduct = () => {
    // Removed unused state variables 'total' and 'setTotal'
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const productPrices = [4990000, 4990000, 4990000];

    const handleCheckboxChange = (e, price, index) => { // Hàm chọn sản phẩm
        if (e.target.checked) {
            setSelectedProducts([...selectedProducts, index]);
        } else {
            setSelectedProducts(selectedProducts.filter(item => item !== index));
        }
    };

    const handleSelectAllChange = (e) => { // Hàm chọn tất cả
        if (e.target.checked) {
            setSelectedProducts(productPrices.map((_, index) => index));
            setSelectAll(true);
        } else {
            setSelectedProducts([]);
            setSelectAll(false);
        }
    };

    const calculateTotal = () => {
        return selectedProducts.reduce((acc, curr) => acc + productPrices[curr], 0);
    };

    const formatCurrency = (amount) => { // Hàm định dạng số thành tiền
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <div style={{ backgroundColor: '#F4F6F8' }}>
            <div className="flex items-center justify-center mb-4">
                <a className="mr-4 ml-0 md:ml-0"><GoArrowLeft className="text-2xl" /></a>
                <h1 className="text-xl font-bold mb-0">Thông tin đơn hàng</h1>
            </div>

            <div className="flex items-center justify-start mb-4 md:mt-4 w-full max-w-[600px] mx-auto">
                <button className="bg-main text-white py-1 px-3 rounded-[10px]">Giỏ hàng</button>
            </div>

            <div>
                <div className="flex items-center justify-start mb-4 md:mt-4 w-full max-w-[600px] mx-auto">
                    <input type="checkbox" id="selectAll" className="mr-2" onChange={handleSelectAllChange} checked={selectAll} />
                    <label htmlFor="selectAll" className="text-gray-700">Chọn tất cả</label>
                </div>
            </div>

            {/* sản phẩm  */}

            <div className="bg-white p-4 rounded-md shadow-md w-full max-w-[600px] mx-auto mt-4 mb-4">
                <div className="flex items-center mb-2">
                    <input type="checkbox" id="selectProduct1" className="mr-2 mb-12 w-4 h-4" onChange={(e) => handleCheckboxChange(e, 4990000, 0)} checked={selectedProducts.includes(0)} />
                    <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:350:0/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23_3.png" alt="Product" className="w-16 h-16 mr-4" />
                    <div className="flex-1">
                        <h2 className="text-lg font-bold">OPPO A3 (6GB 128GB) - Tím</h2>
                        <span className="text-red-600 text-xl font-bold">4.990.000đ</span>
                    </div>
                    <div className="flex items-center">
                        <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded">-</button>
                        <span className="mx-2">1</span>
                        <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded">+</button>
                        <button className=" ml-4"><FaTrashAlt /></button>
                    </div>
                </div>
                <div className="flex items-center mb-2">
                    <input type="checkbox" id="promotion1" className="mr-2" />
                    <label htmlFor="promotion1" className="text-gray-700">Chọn khuyến mãi</label>
                    <span className="text-gray-500 ml-4">- Tặng PMH: 100.000đ</span>
                </div>
                <div className="flex items-center">
                    <IoShieldCheckmarkOutline className="mr-2 w-5 h-5" />
                    <label htmlFor="warranty1" className="text-gray-700">Bảo vệ toàn diện với Bảo hành mở rộng</label>
                    <button className="text-red-600 ml-auto">chọn gói</button>
                </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md w-full max-w-[600px] mx-auto mt-4 mb-4">
                <div className="flex items-center mb-2">
                    <input type="checkbox" id="selectProduct2" className="mr-2 mb-12 w-4 h-4" onChange={(e) => handleCheckboxChange(e, 4990000, 1)} checked={selectedProducts.includes(1)} />
                    <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:350:0/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23_3.png" alt="Product" className="w-16 h-16 mr-4" />
                    <div className="flex-1">
                        <h2 className="text-lg font-bold">OPPO A3 (6GB 128GB) - Tím</h2>
                        <span className="text-red-600 text-xl font-bold">4.990.000đ</span>
                    </div>
                    <div className="flex items-center">
                        <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded">-</button>
                        <span className="mx-2">1</span>
                        <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded">+</button>
                        <button className=" ml-4"><FaTrashAlt /></button>
                    </div>
                </div>
                <div className="flex items-center mb-2">
                    <input type="checkbox" id="promotion2" className="mr-2" />
                    <label htmlFor="promotion2" className="text-gray-700">Chọn khuyến mãi</label>
                    <span className="text-gray-500 ml-4">- Tặng PMH: 100.000đ</span>
                </div>
                <div className="flex items-center">
                    <IoShieldCheckmarkOutline className="mr-2 w-5 h-5" />
                    <label htmlFor="warranty2" className="text-gray-700">Bảo vệ toàn diện với Bảo hành mở rộng</label>
                    <button className="text-red-600 ml-auto">chọn gói</button>
                </div>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md w-full max-w-[600px] mx-auto mt-4 mb-4">
                <div className="flex items-center mb-2">
                    <input type="checkbox" id="selectProduct3" className="mr-2 mb-12 w-4 h-4" onChange={(e) => handleCheckboxChange(e, 4990000, 2)} checked={selectedProducts.includes(2)} />
                    <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:350:0/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23_3.png" alt="Product" className="w-16 h-16 mr-4" />
                    <div className="flex-1">
                        <h2 className="text-lg font-bold">OPPO A3 (6GB 128GB) - Tím</h2>
                        <span className="text-red-600 text-xl font-bold">4.990.000đ</span>
                    </div>
                    <div className="flex items-center">
                        <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded">-</button>
                        <span className="mx-2">1</span>
                        <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded">+</button>
                        <button className=" ml-4"><FaTrashAlt /></button>
                    </div>
                </div>
                <div className="flex items-center mb-2">
                    <input type="checkbox" id="promotion3" className="mr-2" />
                    <label htmlFor="promotion3" className="text-gray-700">Chọn khuyến mãi</label>
                    <span className="text-gray-500 ml-4">- Tặng PMH: 100.000đ</span>
                </div>
                <div className="flex items-center">
                    <IoShieldCheckmarkOutline className="mr-2 w-5 h-5" />
                    <label htmlFor="warranty3" className="text-gray-700">Bảo vệ toàn diện với Bảo hành mở rộng</label>
                    <button className="text-red-600 ml-auto">chọn gói</button>
                </div>
            </div>
            {/* end sản phẩm */}
            
            <div className="bg-white p-4 rounded-md shadow-md w-full max-w-[600px] mx-auto mt-4 mt-15">
                <div className="flex items-center mb-2">
                    <span className="text-gray-700 font-semibold text-lg mr-2">Tạm tính:</span>
                    <span className="text-red-600 text-xl font-bold">{formatCurrency(calculateTotal())}đ</span>
                </div>
                <p className="text-gray-500 text-sm mb-2">Chưa gồm chiết khấu SMember</p>
                <button className="w-full bg-main text-white py-3 rounded-md text-center text-lg font-semibold hover:bg-main transition duration-300 " onClick={() => window.location.href = '/check_info'}>
                    Mua ngay
                </button>
            </div>
        </div>
        
    );
};

export default CartProduct;