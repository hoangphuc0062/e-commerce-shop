// import ReusableTable from "./../../components/table/index";
// import { useState } from "react";

import { useState } from "react";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import { Grid, Paper, Typography } from "@mui/material";

function CategoryPage() {
  const initialCategories = [
    {
      id: 1,
      name: "Parent Category",
      parentId: null,
      image: "https://via.placeholder.com/50",
      description: "This is a parent category",
    },
    {
      id: 2,
      name: "Child 1",
      parentId: 1,
      image: "https://via.placeholder.com/50",
      description: "This is a child category",
    },
    {
      id: 3,
      name: "Child 2",
      parentId: 1,
      image: "https://via.placeholder.com/50",
      description: "This is a child category",
    },
    {
      id: 4,
      name: "Second Category",
      parentId: null,
      image: "https://via.placeholder.com/50",
      description: "This is a second parent category",
    },
    {
      id: 5,
      name: "Third Category",
      parentId: null,
      image: "https://via.placeholder.com/50",
      description: "This is a third parent category",
    },
    {
      id: 6,
      name: "Child 1",
      parentId: 5,
      image: "https://via.placeholder.com/50",
      description: "This is a child category",
    },
  ];

  const [categories, setCategories] = useState(initialCategories);

  const addCategory = (newCategory) => {
    const newId = categories.length + 1;
    const categoryToAdd = {
      id: newId,
      name: newCategory.name,
      parentId: newCategory.parentId ? Number(newCategory.parentId) : null,
    };
    setCategories([...categories, categoryToAdd]);
    console.log("New category added: ", categoryToAdd);
  };

  const editCategory = (id, newName) => {
    const updatedCategories = categories.map((cat) =>
      cat.id === id ? { ...cat, name: newName } : cat
    );
    setCategories(updatedCategories);
  };

  const deleteCategory = (id) => {
    const updatedCategories = categories.filter((cat) => cat.id !== id);
    setCategories(updatedCategories);
  };

  return (
    <Grid container spacing={3}>
      {/* Left: Category List */}
      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Danh mục
          </Typography>
          <CategoryList
            categories={categories}
            onEdit={editCategory}
            onDelete={deleteCategory}
          />
        </Paper>
      </Grid>

      {/* Right: Create Category Form */}
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Tạo danh mục
          </Typography>
          <CategoryForm categories={categories} onAddCategory={addCategory} />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default CategoryPage;
