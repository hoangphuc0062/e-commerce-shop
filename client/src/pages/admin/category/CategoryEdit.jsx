/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Dialog } from '../../../components';

function CategoryEdit({ category, onUpdate, onCancel }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    categoryName: '',
    slug: '',
    description: ''
  });

  useEffect(() => {
    if (category) {
      setFormData({
        categoryName: category.name || '',
        slug: category.slug || '',
        description: category.description || ''
      });
      setIsDialogOpen(true); // Open the dialog when a category is provided
    }
  }, [category]);

  const handleFormSubmit = (data) => {
    console.log('Updated category data:', data);
    onUpdate(data); // Pass the updated data back to the parent component
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    onCancel(); // Notify parent to reset editing state
  };

  const fields = [
    { name: 'categoryName', label: 'Tên Danh Mục', placeholder: 'Nhập tên danh mục', required: true, value: formData.categoryName },
    { name: 'slug', label: 'Slug', placeholder: 'Nhập slug cho danh mục', required: true, value: formData.slug },
    { name: 'description', label: 'Mô Tả', placeholder: 'Nhập mô tả cho danh mục', type: 'textarea', value: formData.description }
  ];

  return (
    
    <div className="p-4">
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Dialog
            title="Chỉnh Sửa Danh Mục"
            fields={fields}
            onSubmit={handleFormSubmit}
            onCancel={handleCloseDialog}
          />
        </div>
      )}
    </div>
  );
}

export default CategoryEdit;
