import PropTypes from 'prop-types';
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from 'sweetalert2';

import 'primereact/resources/themes/saga-blue/theme.css'; // Hoặc theme khác
import 'primereact/resources/primereact.min.css'; 
import 'primeicons/primeicons.css'; 

const CartProducts = ({ product, isSelected, onCheckboxChange }) => {
    const handleTrashClick = () => {
        Swal.fire({
            title: "Bạn Muốn Xóa Sản Phẩm Này?",
            icon: "info",
            showDenyButton: true,
            confirmButtonText: "Xóa",
            denyButtonText: `Hủy`
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Xóa sản phẩm thành công!",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false,
                    toast: true,
                    position: 'top-end'
                });
            } else if (result.isDenied) {
                Swal.fire({
                    title: "Hủy xóa sản phẩm!",
                    icon: "info",
                    timer: 1500,
                    showConfirmButton: false,
                    toast: true,
                    position: 'top-end'
                });
            }
        });
    }; // SweetAlert2

    return (
        <div className="bg-white p-4 rounded-md shadow-md w-full max-w-[600px] mx-auto mt-4 mb-4">
            <div className="flex items-center mb-2">
                <input 
                    type="checkbox" 
                    className="mr-2 mb-12 w-4 h-4" 
                    onChange={onCheckboxChange} 
                    checked={isSelected} 
                />
                <img src={product.imageUrl} alt={product.name} className="w-16 h-16 mr-4" />
                <div className="flex-1">
                    <h2 className="text-lg font-medium">{product.name}</h2>
                    <span className="text-red-600 text-xl font-bold">{product.price}đ</span>
                </div>
                <div className="flex items-center">
                    <button className="bg-gray-200 text-gray-700 px-2.5 py-1 rounded">-</button>
                    <span className="mx-2">1</span>
                    <button className="bg-gray-200 text-gray-700 px-2 py-1 rounded">+</button>
                    <button className="ml-4" onClick={handleTrashClick}> 
                        <FaRegTrashCan />
                    </button>
                </div>
            </div>
            <div className="flex items-center mb-2">
                <input type="checkbox" className="mr-2" />
                <label className="text-gray-700">Chọn khuyến mãi</label>
                <span className="text-gray-500 ml-4">- Tặng PMH: 100.000đ</span>
            </div>
            <div className="flex items-center">
                <IoShieldCheckmarkOutline className="mr-2 w-5 h-5" />
                <label className="text-gray-700">Bảo vệ toàn diện với Bảo hành mở rộng</label>
                <button className="text-red-600 ml-auto">chọn gói</button>
            </div>
        </div>
    );
};

CartProducts.propTypes = {
    product: PropTypes.shape({
        imageUrl: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
    isSelected: PropTypes.bool.isRequired,
    onCheckboxChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
};

export default CartProducts;
