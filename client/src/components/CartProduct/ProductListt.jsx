import PropTypes from 'prop-types';
import CartProducts from './CartProducts';

const ProductListt = ({ products, selectedProducts, handleCheckboxChange }) => {
    return (
        <>
            {products.map((product, index) => (
                <CartProducts
                    key={index}
                    product={product}
                    isSelected={selectedProducts.includes(index)}
                    onCheckboxChange={(e) => handleCheckboxChange(e, product.price, index)}  // Truyền hàm xóa Truyền index để xóa sản phẩm
                />
            ))}
        </>
    );
};

ProductListt.propTypes = {
    products: PropTypes.arrayOf(
        PropTypes.shape({
            imageUrl: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
        })
    ).isRequired,
    selectedProducts: PropTypes.arrayOf(PropTypes.number).isRequired,
    handleCheckboxChange: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,  // Thêm prop cho hàm xóa
};

export default ProductListt;
