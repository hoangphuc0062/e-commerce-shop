import ReusableTable from "../../components/table";

function CategoryPage() {
  const handleEdit = (index) => {
    console.log("Edit", index);
  };
  const handleDelete = (index) => {
    console.log("Delete", index);
  };
  const initialData = [
    { id: 1, name: "John Doe", age: 28, email: "john@example.com" },
    { id: 2, name: "Jane Smith", age: 34, email: "jane@example.com" },
    { id: 3, name: "Mike Johnson", age: 45, email: "mike@example.com" },
    { id: 4, name: "Kate James", age: 25, email: "kate@gmail.com" },
    { id: 5, name: "Laura Croft", age: 30, email: "laura@gmail.com" },
    { id: 6, name: "Tom Cruise", age: 50, email: "Tom@gmail.com" },
    { id: 7, name: "Brad Pitt", age: 55, email: "Barad.com" },
    { id: 8, name: "Angelina Jolie", age: 45, email: "Angelina.com" },
    { id: 9, name: "John Doe", age: 28, email: "qqqqqqqq@gmail.com" },
    { id: 10, name: "John Doe", age: 28, email: "kfnkkese@gmail.com" },
    { id: 11, name: "John Doe", age: 28, email: "afwfwa", afsa: "afsa" },
  ];
  const columns = [
    { label: "Name", field: "name" },
    { label: "Age", field: "age" },
    { label: "Email", field: "email" },
    { label: "Teen adnh muc", field: "afsa" }, // Bạn có thể thêm hoặc giảm trường tại đây
  ];
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
