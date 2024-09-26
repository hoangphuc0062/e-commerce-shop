import { FaRegTrashCan } from "react-icons/fa6";
import { GoArrowLeft } from "react-icons/go";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

const CartProduct = () => {
    return (
        <div className="cart-container text-center bg-[#F4F6F8] p-5">
            <div className="flex items-center justify-center">
                <a className="mr-4 ml-0 md:ml-0"><GoArrowLeft className="text-2xl" /></a>
                <h1 className="text-xl font-bold mb-0">Giỏ hàng của bạn</h1>
            </div>
            <div className="cart-button-container mt-4 mb-4 md:ml-[-500px] lg:ml-[-500px] xl:ml-[-500px] 2xl:ml-[-500px]">
                <button className="bg-red-600 text-white py-2 px-4 rounded-[10px] md:ml-0 lg:ml-0 xl:ml-0 2xl:ml-0 ml-[-175px]">
                    Giỏ hàng
                </button>
            </div>
            <div className="flex items-center justify-center mt-2 md:ml-[-480px] lg:ml-[-480px] xl:ml-[-480px] 2xl:ml-[-480px] ml-[-160px] pb-2">
                <input type="checkbox" id="select-all" className="form-checkbox h-[17px] w-[17px] text-blue-600" />
                <label htmlFor="select-all" className="ml-2">Chọn tất cả</label>
            </div>
            
            <div className="cart-item flex items-center justify-between p-4 border-b mx-auto bg-white" style={{ width: '600px', borderRadius: '10px', marginBottom: '20px' }}>
                <div className="item-details flex-1 mx-4 text-left">
                    <div className="item-info flex items-center py-5">
                        <div className="flex items-center mt-2">
                            <input type="checkbox" className="form-checkbox h-[20px] w-[20px] text-blue-600 mt-[-97px]" />
                            <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:350:0/q:80/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_7__2_103.png" alt="OPPO A3" className="w-24 h-24 mt-[-20px] ml-2" />
                        </div>
                        <div className="ml-4 flex flex-col justify-center">
                            <div className="flex items-center">
                                <h2 className="text-lg font-semibold">OPPO A3 (6GB 128GB) - Tím</h2>
                                <button className="ml-2 ml-[130px]"><FaRegTrashCan /></button>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <p className="text-red-500 text-xl ">4.990.000đ</p>
                                <div className="flex items-center">
                                    <button className="border px-2 bg-gray-200">-</button>
                                    <span className="mx-2">1</span>
                                    <button className="border px-2 bg-gray-200">+</button> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="warranty flex flex-col mt-2">
                        <div className="flex items-center">
                            <input type="checkbox" id="promotion" />
                            <label htmlFor="promotion" className="ml-2">Chọn khuyến mãi</label>
                            <span className="text-gray-500 ml-2">- Tặng PMH: 100.000đ</span>
                        </div>
                        <div className="flex items-center mt-2">
                            <IoShieldCheckmarkOutline className="text-2xl" />
                            <label htmlFor="warranty" className="ml-2 whitespace-nowrap">Bảo vệ toàn diện với Bảo hành mở rộng</label>
                            <div className="flex items-center justify-between">
                                <span className="text-red-500 cursor-pointer ml-[120px]">Chọn gói</span>
                                <MdOutlineKeyboardArrowRight className="text-2xl text-red-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="cart-item flex items-center justify-between p-4 border-b mx-auto bg-white" style={{ width: '600px', borderRadius: '10px', marginBottom: '20px' }}>
                <div className="item-details flex-1 mx-4 text-left">
                    <div className="item-info flex items-center py-5">
                        <div className="flex items-center mt-2">
                            <input type="checkbox" className="form-checkbox h-[20px] w-[20px] text-blue-600 mt-[-97px]" />
                            <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:350:0/q:80/plain/https://cellphones.com.vn/media/catalog/product/t/e/text_ng_n_7__2_103.png" alt="OPPO A3" className="w-24 h-24 mt-[-20px] ml-2" />
                        </div>
                        <div className="ml-4 flex flex-col justify-center">
                            <div className="flex items-center">
                                <h2 className="text-lg font-semibold">OPPO A3 (6GB 128GB) - Tím</h2>
                                <button className="ml-2 ml-[130px]"><FaRegTrashCan /></button>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <p className="text-red-500 text-xl ">4.990.000đ</p>
                                <div className="flex items-center">
                                    <button className="border px-2 bg-gray-200">-</button>
                                    <span className="mx-2">1</span>
                                    <button className="border px-2 bg-gray-200">+</button> 
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="warranty flex flex-col mt-2">
                        <div className="flex items-center">
                            <input type="checkbox" id="promotion" />
                            <label htmlFor="promotion" className="ml-2">Chọn khuyến mãi</label>
                            <span className="text-gray-500 ml-2">- Tặng PMH: 100.000đ</span>
                        </div>
                        <div className="flex items-center mt-2">
                            <IoShieldCheckmarkOutline className="text-2xl" />
                            <label htmlFor="warranty" className="ml-2 whitespace-nowrap">Bảo vệ toàn diện với Bảo hành mở rộng</label>
                            <div className="flex items-center justify-between">
                                <span className="text-red-500 cursor-pointer ml-[120px]">Chọn gói</span>
                                <MdOutlineKeyboardArrowRight className="text-2xl text-red-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProduct;