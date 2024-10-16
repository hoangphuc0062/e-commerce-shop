import Heading from "../Heading/Heading";
import TextBgrGray from "./Text/TextBgrGray";
import TextBgrWhite from "./Text/TextBgrWhite";
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
  width: 500,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #1e40af",
  boxShadow: 24,
  p: 4,
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  borderRadius: "10px",
};

const ProductSpecifications = ({ product }) => {
  const { FaAngleDown, IoMdClose  } = icons;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="p-4 rounded-lg shadow-md w-full lg:w-[30%] lg:flex hidden flex-col gap-4">
      <Heading title="Thông Số Kỹ Thuật" />
      <div className="flex flex-col">
        {product && (
          <div className="mb-4">
            <TextBgrGray content={`Màn hình: ${product.screen}`} />
            <TextBgrWhite content={`RAM: ${product.options[0]?.ram}`} />
            <TextBgrGray content={`ROM: ${product.options[0]?.rom}`} />
          </div>
        )}
      </div>
      <Button
        onClick={handleOpen}
        className="hover:border-main hover:text-main "
        sx={{
          borderRadius: "4px",
          border: "1px solid #fff",
          color: "#000",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          rounded: "4px",
        }}
      >
        Xem Cấu Hình Chi Tiết <FaAngleDown className="ml-2 text-lg" />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, position: "relative" }}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="text-center text-2xl uppercase"
          >
            Thông Số Kỹ Thuật
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {product && (
              <div className="flex flex-col gap-4">
                <TextBgrGray content={`Màn hình: ${product.screen}`} />
                <TextBgrWhite content={`RAM: ${product.options[0]?.ram}`} />
                <TextBgrGray content={`ROM: ${product.options[0]?.rom}`} />
              </div>
            )}
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

export default ProductSpecifications;
