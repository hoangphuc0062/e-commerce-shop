import ReusableTable from "./../../components/table/index";

function CategoryPage() {
  const columns = [
    { label: "Tên danh mục", field: "name" },
    { label: "Tên danh mục con", field: "namesub" },
  ];

  const initialData = [
    {
      id: 1,
      namesub: "active",
      name: "Nguyễn Văn A",
    },
    {
      id: 2,
      namesub: "active",
      name: "Nguyễn Văn B",
    },
    {
      id: 3,
      namesub: "inactive",
      name: "Nguyễn Văn C",
    },
  ];

  const handleDelete = (id) => {
    console.log("Delete", id);
  };

  const handleEdit = (id) => {
    console.log("Edit", id);
  };

  return (
    <>
      <ReusableTable
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        data={initialData}
        columns={columns}
      />
    </>
  );
}

export default CategoryPage;
