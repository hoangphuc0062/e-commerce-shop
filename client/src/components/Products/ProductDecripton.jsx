import Heading from "../Heading/Heading";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import icons from "../../ultils/icon";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #1e40af",
  boxShadow: 24,
  p: 4,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  borderRadius: "10px",
  width: {
    xs: "100%", // Full width on mobile
    sm: "500px", // 500px width on larger screens
  },
  height: {
    xs: "100%", // Full height on mobile
    sm: "600px", // 600px height on larger screens
  },
};

const ProductDecripton = ({ product }) => {
  const { IoMdClose } = icons;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="p-4 rounded-lg shadow-md w-full lg:w-[70%] flex flex-col gap-4">
      <div className="flex justify-center items-center">
        <Heading title={`Đặc điểm nổi bật của ${product?.name}`} />
      </div>
      <div className="flex flex-col gap-2">{product?.description}</div>

      {/* Nút Button chỉ hiển thị trên tablet và desktop */}
      <Button
        onClick={handleOpen}
        className="hidden sm:block hover:border-main hover:text-main"
        sx={{
          borderRadius: "4px",
          border: "1px solid #fff",
          color: "#000",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        }}
      >
        Xem chi tiết
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {product?.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {product?.description}
          </Typography>
          <Button
            onClick={handleClose}
            className="hover:bg-main/80 hover:text-white transition duration-300"
            sx={{
              position: "absolute",
              bottom: 16,
              right: 16,
              borderRadius: "4px",
              backgroundColor: "#1e40af",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <IoMdClose className="mr-1 text-lg" />
            Đóng
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default ProductDecripton;
