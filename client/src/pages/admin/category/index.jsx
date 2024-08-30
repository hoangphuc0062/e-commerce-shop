import { useState } from "react";
import { Pagination, Table } from "../../../components";
import icons from "../../../ultils/icon";
const { FaPen, MdDelete, IoMdAddCircleOutline } = icons;

function CategoryList() {
  const handleEdit = (id) => {
    console.log(`Edit category with ID: ${id}`);
    // Add your edit logic here
  };

  const handleDelete = (id) => {
    console.log(`Delete category with ID: ${id}`);
    // Add your delete logic here
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const columns = [
    { id: 'id', label: 'ID', isFirst: true },
    { id: 'name', label: 'Tên Danh Mục' },
    { id: 'actions', label: 'Hành động', isLast: true },
  ];

  const allData = [
    {
      id: 1,
      name: 'Category 1',
      actions: (
        <>
          <button onClick={() => handleEdit(1)} className="mr-2 text-lg">
            <FaPen />
          </button>
          <button onClick={() => handleDelete(1)} className="text-lg">
            <MdDelete />
          </button>
        </>
      ),
    },
    {
      id: 2,
      name: 'Category 2',
      actions: (
        <>
          <button onClick={() => handleEdit(2)} className="mr-2 text-lg">
            <FaPen />
          </button>
          <button onClick={() => handleDelete(2)} className="text-lg">
            <MdDelete />
          </button>
        </>
      ),
    },
    {
      id: 3,
      name: 'Category 3',
      actions: (
        <>
          <button onClick={() => handleEdit(3)} className="mr-2 text-lg">
            <FaPen />
          </button>
          <button onClick={() => handleDelete(3)} className="text-lg">
            <MdDelete />
          </button>
        </>
      ),
    },
    {
      id: 4,
      name: 'Category 4',
      actions: (
        <>
          <button onClick={() => handleEdit(4)} className="mr-2 text-lg">
            <FaPen />
          </button>
          <button onClick={() => handleDelete(4)} className="text-lg">
            <MdDelete />
          </button>
        </>
      ),
    },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = allData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(allData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="dark:text-white text-2xl">Danh Sách Danh Mục</h1>
  
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
          <IoMdAddCircleOutline className="mr-2 text-2xl" />
          Thêm Danh Mục
        </button>
      </div>

      <div className="mt-4">
        <Table columns={columns} data={currentData} />
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
