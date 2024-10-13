import { useState } from "react";
import {
  Button,
  TextField,
  Modal,
  IconButton,
  InputAdornment,
  Stack,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { evaIcon } from "../../../utils/icon-eva";
import { useFormik } from "formik";
import slugify from "../../../utils/slugify";

function CategoryCreate() {
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    icon: "",
    type: "",
    description: "",
  });

  const [isIconModalOpen, setIsIconModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [icons, setIcons] = useState([]);
  const formik = useFormik({
    initialValues: {
      name: "",
      icon: "",
      slug: "",
      type: "",
      description: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const toggleIconModal = () => {
    setIsIconModalOpen(!isIconModalOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleIconSelect = (value) => {
    formik.setFieldValue("icon", value);
    toggleIconModal();
  };

  const filteredIcons = icons.filter((icon) =>
    icon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const handleChangeName = (e) => {
    console.log(e.target.value);
    formik.setFieldValue("name", e.target.value);
    formik.setFieldValue("slug", slugify(e.target.value));
    formik.setFieldValue("type", e.target.value);
    formik.setFieldValue("description", e.target.value);
  };

  return (
    <div>
      <h2>Add New Category</h2>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label="Tên danh mục"
          name="name"
          value={formik.values.name}
          onChange={handleChangeName}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Slug"
          name="slug"
          value={formik.values.slug}
          onChange={formik.handleChange}
          margin="normal"
        />
        <Icon icon={`eva:${formik.values.icon}`} />
        <Button onClick={toggleIconModal}>Chọn Icon</Button>
        <TextField
          fullWidth
          label="Loại"
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
          margin="normal"
        />

        <TextField
          fullWidth
          label="Mô tả"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          margin="normal"
        />

        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Thêm danh mục
        </Button>
      </form>
      {/* Icon Selection Modal */}
      <Modal open={isIconModalOpen} onClose={toggleIconModal}>
        <div
          style={{
            padding: "20px",
            background: "#fff",
            margin: "100px auto",
            width: "400px",
          }}
        >
          <h2>Chọn Icon</h2>

          <TextField
            fullWidth
            placeholder="Tìm kiếm icon"
            value={searchQuery}
            onChange={handleSearchChange}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <Stack flexWrap="wrap" direction="row">
            {evaIcon.map((icon, i) => (
              <IconButton key={i} onClick={() => handleIconSelect(icon.class)}>
                <Icon icon={`eva:${icon.class}`} />
              </IconButton>
            ))}
          </Stack>
        </div>
      </Modal>
    </div>
  );
}

export default CategoryCreate;
