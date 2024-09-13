import Button from "@mui/material/Button";
import propTypes from "prop-types";
const CustomButton = ({
  label,
  onClick,
  variant = "contained",
  color = "primary",
  size = "medium",
  icons,
  style,
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      size={size}
      onClick={onClick}
      startIcon={icons}
      sx={style}
    >
      {label}
    </Button>
  );
};
CustomButton.propTypes = {
  label: propTypes.string.isRequired,
  onClick: propTypes.func.isRequired,
  variant: propTypes.string,
  color: propTypes.string,
  size: propTypes.string,
  icons: propTypes.element,
  style: propTypes.object,
};
export default CustomButton;
