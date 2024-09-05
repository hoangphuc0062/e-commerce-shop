import { useState } from "react";
import { Pagination, Table } from "../../../components";
import CategoryAdd from "./CategoryAdd";
import CategoryEdit from "./CategoryEdit";
import { Helmet } from "react-helmet-async";

function CategoryList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [editingCategory, setEditingCategory] = useState(null);

  const handleEdit = (category) => {
    setEditingCategory(category);
  };

  const handleUpdateCategory = (updatedCategory) => {
    if (updatedCategory) {
      console.log("Danh mục đã được cập nhật:", updatedCategory);
    }
    setEditingCategory(null);
  };

  const handleDelete = (id) => {
    console.log(`Delete category with ID: ${id}`);
    // Add your delete logic here
  };

  const columns = ["ID", "Tên Danh Mục"];

  const allData = [
    {
      id: 1,
      slug: "123",
      name: "Product 1",
      img: "https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-6/454935858_1025894225852691_7770544709709728940_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=V81SNGbvHacQ7kNvgEY_qyI&_nc_ht=scontent.fhan5-3.fna&oh=00_AYAe7s4HjzgtAvSWurmnMie90x0UxNSCJXB4EY8E_P24gw&oe=66DB5EF0",
    },
    {
      id: 2,
      name: "Product 2",
      img: "https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-6/454935858_1025894225852691_7770544709709728940_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=V81SNGbvHacQ7kNvgEY_qyI&_nc_ht=scontent.fhan5-3.fna&oh=00_AYAe7s4HjzgtAvSWurmnMie90x0UxNSCJXB4EY8E_P24gw&oe=66DB5EF0",
    },
    {
      id: 3,
      name: "Product 3",
      img: "https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-6/454935858_1025894225852691_7770544709709728940_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=V81SNGbvHacQ7kNvgEY_qyI&_nc_ht=scontent.fhan5-3.fna&oh=00_AYAe7s4HjzgtAvSWurmnMie90x0UxNSCJXB4EY8E_P24gw&oe=66DB5EF0",
    },
    {
      id: 4,
      name: "Product 4",
      img: "https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-6/454935858_1025894225852691_7770544709709728940_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=V81SNGbvHacQ7kNvgEY_qyI&_nc_ht=scontent.fhan5-3.fna&oh=00_AYAe7s4HjzgtAvSWurmnMie90x0UxNSCJXB4EY8E_P24gw&oe=66DB5EF0",
    },
    {
      id: 5,
      name: "Product 5",
      img: "https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-6/454935858_1025894225852691_7770544709709728940_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=V81SNGbvHacQ7kNvgEY_qyI&_nc_ht=scontent.fhan5-3.fna&oh=00_AYAe7s4HjzgtAvSWurmnMie90x0UxNSCJXB4EY8E_P24gw&oe=66DB5EF0",
    },
    {
      id: 6,
      name: "Product 6",
      img: "https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-6/454935858_1025894225852691_7770544709709728940_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=V81SNGbvHacQ7kNvgEY_qyI&_nc_ht=scontent.fhan5-3.fna&oh=00_AYAe7s4HjzgtAvSWurmnMie90x0UxNSCJXB4EY8E_P24gw&oe=66DB5EF0",
    },
    {
      id: 7,
      name: "Product 7",
      img: "https://scontent.fhan5-3.fna.fbcdn.net/v/t39.30808-6/454935858_1025894225852691_7770544709709728940_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=V81SNGbvHacQ7kNvgEY_qyI&_nc_ht=scontent.fhan5-3.fna&oh=00_AYAe7s4HjzgtAvSWurmnMie90x0UxNSCJXB4EY8E_P24gw&oe=66DB5EF0",
    },
  ];

  // Hàm tìm kiếm
  const filteredData = allData.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <Helmet>
        <title> Danh Mục | Voi Tây Nguyên</title>
      </Helmet>
      <div className="flex justify-between items-center mb-4">
        <h1 className="dark:text-white text-xl sm:text-2xl md:text-3xl lg:text-4xl">
          Danh Sách Danh Mục
        </h1>
        <CategoryAdd />
      </div>

      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="mr-2 p-2 border border-gray-300 rounded bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
      </div>

      <div className="mt-4">
        <Table
          columns={columns}
          data={currentData}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
        {editingCategory && (
          <CategoryEdit
            category={editingCategory}
            onUpdate={handleUpdateCategory}
            onCancel={() => setEditingCategory(null)}
          />
        )}
        <div className="flex justify-end mt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}

export default CategoryList;
