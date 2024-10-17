import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
export default function FormButtons({ handleSubmit }) {
  const navigate = useNavigate();
  return (
    <Box sx={{ mt: 4, textAlign: "right" }}>
      <Button
        variant="contained"
        color="success"
        type="submit"
        onClick={handleSubmit}
      >
        Tạo sản phẩm
      </Button>
      <Button
        sx={{ ml: 2 }}
        color="error"
        variant="contained"
        onClick={() => {
          navigate("/dashboard/product");
        }}
      >
        Hủy
      </Button>
    </Box>
  );
}
FormButtons.propTypes = {
  handleSubmit: PropTypes.func,
};
