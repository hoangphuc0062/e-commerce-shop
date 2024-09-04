import { useState } from 'react';
import { Dialog } from '../../../components';
import icons from './../../../ultils/icon';


function CategoryAdd() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleFormSubmit = (data) => {
    console.log('Dữ liệu danh mục:', data);
    // Xử lý thêm danh mục với dữ liệu đã nhập
    handleCloseDialog();
  };

  const fields = [
    { name: 'categoryName', label: 'Tên Danh Mục', placeholder: 'Nhập tên danh mục', required: true },
    { name: 'slug', label: 'Slug', placeholder: 'Nhập slug cho danh mục', required: true },
    { name: 'description', label: 'Mô Tả', placeholder: 'Nhập mô tả cho danh mục', type: 'textarea' }
  ];

  return (
    <div className="p-4">
      <button
        onClick={handleOpenDialog}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md flex items-center justify-center"
      >
        <div className="flex items-center justify-center">
          {icons.IoMdAddCircleOutline && <icons.IoMdAddCircleOutline className="text-2xl" />}
        </div>
        <div className="ml-2 flex items-center justify-center">
          <div className="block text-sm sm:text-base md:text-lg lg:text-xl">Thêm danh mục mới</div>
        </div>
      </button>
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Dialog
            title="Thêm Danh Mục Mới"
            fields={fields}
            onSubmit={handleFormSubmit}
            onCancel={handleCloseDialog}
          />
        </div>
      )}
    </div>
  );
}

export default CategoryAdd;
