import ReusableTable from "../../components/Table";
import HomeIcon from "@mui/icons-material/Home";
import { Icon } from "@iconify-icon/react";
function CategoryPage() {
  const columns = [
    { label: "Tên danh mục", field: "name" },
    { label: "Slug", field: "slug" },
    { label: "Icon", field: "icon" },
    { label: "Loại", field: "type" },
  ];

  const handleEdit = (index) => {
    console.log("edit", index);
  };
  const handleDelete = (index) => {
    console.log("delete", index);
  };

  const items = [
    {
      name: "Danh mục 1",
      slug: "danh-muc-1",
      icon: <HomeIcon />,
      type: "type",
      description: "description",
    },
    {
      name: "Danh mục 2",
      slug: "danh-muc-2",
      icon: <HomeIcon />,
      type: "type",
      description: "description",
    },
  ];

  return (
    <>
      <ReusableTable
        columns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        data={items}
      />
      <Icon icon="material-symbols:home" />
    </>
  );
}

export default CategoryPage;
