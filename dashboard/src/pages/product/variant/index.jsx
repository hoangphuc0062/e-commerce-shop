/* eslint-disable no-unused-vars */
import { useState } from "react";
import VariantForm from "./create";
import ReusableTable from "../../../components/table";

export default function VariantPage() {
  const [open, setOpen] = useState(false);
  const [variantData, setVariantData] = useState({
    name: "",
    type: "",
  });
  const handleVariantChange = (key, value) => {
    setVariantData({
      ...variantData,
      [key]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(variantData);
    handleClose();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { label: "ID", field: "id" },
    { label: "Tên biến thể", field: "name" },
    { label: "Giá trị", field: "type" },
  ];
  const initialData = [
    {
      id: 1,
      name: "color",
      type: "red",
    },
    {
      id: 2,
      name: "size",
      type: "XL",
    },
    {
      id: 3,
      name: "weight",
      type: "1kg",
    },
  ];
  const handleEdit = (data) => {
    console.log(data);
  };
  const handleDelete = (data) => {
    console.log(data);
  };
  return (
    <>
      <ReusableTable
        data={initialData}
        columns={columns}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        buttonAdd={handleClickOpen}
      />
      <VariantForm
        open={open}
        handleClose={handleClose}
        variantData={variantData}
        handleVariantChange={handleVariantChange}
        handleSubmit={handleSubmit}
      />
      {dataEdit && (
        <EditVariant
          open={openEdit}
          handleClose={() => {
            setOpenEdit(false);
            setDataEdit(null);
          }}
          initialData={dataEdit}
          handleSave={handleSave}
        />
      )}
    </>
  );
}
