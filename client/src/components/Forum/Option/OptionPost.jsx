import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const OptionPost = ({ onSortChange }) => {
  const [sortOption, setSortOption] = React.useState("");

  const handleChange = (event) => {
    const value = event.target.value;
    setSortOption(value);
    onSortChange(value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
      <InputLabel id="demo-select-small-label">Lọc theo</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={sortOption}
        label="Lọc theo"
        onChange={handleChange}
      >
        <MenuItem value="newest">Mới nhất</MenuItem>
        <MenuItem value="oldest">Cũ nhất</MenuItem>
        <MenuItem value="highestRating">Đánh giá cao</MenuItem>
      </Select>
    </FormControl>
  );
};
export default OptionPost;
