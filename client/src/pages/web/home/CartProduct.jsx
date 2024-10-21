import { GoArrowLeft } from "react-icons/go";
import { useState } from "react";
import ProductList from "../../../components/CartProduct/ProductListt";

const CartProduct = () => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [products, setProducts] = useState([
        { name: "OPPO A3 (6GB 128GB) - Tím", 
            price: "4.990.000", 
            imageUrl: "https://cdn2.cellphones.com.vn/insecure/rs:fill:350:0/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23_3.png" 
        },
        { name: "OPPO A99 (6GB 128GB) - Tím", 
            price: "4.990.000", 
            imageUrl: "https://cdn2.cellphones.com.vn/insecure/rs:fill:350:0/q:80/plain/https://cellphones.com.vn/media/catalog/product/s/a/samsung-s23_3.png" 
        },
        
        
    ]);

    const handleCheckboxChange = (e, price, index) => { // chọn sản phẩm
        if (e.target.checked) {
            setSelectedProducts([...selectedProducts, index]);
        } else {
            setSelectedProducts(selectedProducts.filter(item => item !== index));
        }
    };

    const handleSelectAllChange = (e) => { // chọn tất cả
        if (e.target.checked) {
            setSelectedProducts(products.map((_, index) => index));
            setSelectAll(true);
        } else {
            setSelectedProducts([]);
            setSelectAll(false);
        }
    };

    const handleDeleteProduct = (index) => {
        setProducts(products.filter((_, i) => i !== index));
        setSelectedProducts(selectedProducts.filter(item => item !== index)); 
    };

    const calculateTotal = () => {
        return selectedProducts.reduce((acc, curr) => {
            const price = parseFloat(products[curr].price.replace(/\./g, '')); // loại bỏ dấu chấm và chuyển đổi thành số
            return acc + price;
        }, 0);
    };
    

    const formatCurrency = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    return (
        <div style={{ backgroundColor: '#F4F6F8' }}>
            <div className="flex items-center justify-center mb-4 mt-4">
                <a className="mr-4 ml-0"><GoArrowLeft className="text-2xl" /></a>
                <h1 className="text-xl font-bold mb-0">Thông tin đơn hàng</h1>
            </div>

            <div className="flex items-center justify-start mb-4 w-full max-w-[95%] md:max-w-[600px] mx-auto">
                <button className="bg-main text-white py-1 px-3 rounded-[6px]">Giỏ hàng</button>
            </div>

            <div className="flex items-center justify-start mb-4 w-full max-w-[95%] md:max-w-[600px] mx-auto">
                <input 
                    type="checkbox" 
                    className="mr-2" 
                    onChange={handleSelectAllChange} 
                    checked={selectAll} 
                />
                <label className="text-gray-700">Chọn tất cả</label>
            </div>

            <ProductList
                products={products}
                selectedProducts={selectedProducts}
                handleCheckboxChange={handleCheckboxChange}
                handleDeleteProduct={handleDeleteProduct}
            />

            <div className="bg-white p-4 rounded-md shadow-md w-full max-w-[600px] mx-auto mt-4 mb-4">
                <div className="flex items-center mb-2">
                    <span className="text-gray-700 font-semibold text-lg mr-2">Tạm tính:</span>
                    <span className="text-red-600 text-xl font-bold">{formatCurrency(calculateTotal())}đ</span>
                </div>
                <p className="text-gray-500 text-sm mb-2">Chưa gồm chiết khấu SMember</p>
                <button className="w-full bg-main text-white py-3 rounded-md text-center text-lg font-semibold hover:bg-main transition duration-300" onClick={() => window.location.href = '/check_info'}>
                    Mua ngay
                </button>
            </div>
        </div>
    );
};

export default CartProduct;
