import PropTypes from "prop-types";

import TextField from "@mui/material/TextField";

const CustomInputField = ({
  label,
  value,
  onChange,
  type = "text",
  error,
  helperText,
}) => {
  return (
    <TextField
      fullWidth
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
    />
  );
};

CustomInputField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default CustomInputField;
