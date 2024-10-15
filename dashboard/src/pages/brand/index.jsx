import { Grid } from "@mui/material";
import ReusableTable from "../../components/Table";
import BrandFrom from "./create";

export default function BrandPage() {
  const columns = [
    { label: "Tên thương hiệu", field: "name" },
    { label: "hình", field: "image" },
  ];
  const handleEdit = (index) => {
    console.log(index);
  };
  const handleDelete = (index) => {
    console.log(index);
  };

  const items = [
    {
      id: 1,
      name: "Apple",
      image: "https://via.placeholder.com/150 ",
    },
    {
      id: 2,
      name: "Samsung",
      image: "https://via.placeholder.com/150 ",
    },
    {
      id: 3,
      name: "Xiaomi",
      image: "https://via.placeholder.com/150 ",
    },
    {
      id: 4,
      name: "Oppo",
      image: "https://via.placeholder.com/150 ",
    },
    {
      id: 5,
      name: "Vivo",
      image: "https://via.placeholder.com/150 ",
    },
  ];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <ReusableTable
            columns={columns}
            items={items}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            data={items}
          />
        </Grid>
        <Grid item xs={7}>
          <BrandFrom />
        </Grid>
      </Grid>
    </>
  );
}
