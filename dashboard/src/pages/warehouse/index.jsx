import React, { useState } from "react";
import { Button, Modal, Box, TextField, Grid, Paper } from "@mui/material";
import ReusableTable from "../../components/table";
import AddWarehouseDialog from "./create";

// Dữ liệu ban đầu
const initialData = [
  {
    id: 10111,
    name: "Kho Tây Nguyên",
    address: "28 Ywang, TP BMT",
    describe: "Mô tả tất cả mọi thứ ở đây",
  },
  {
    id: 10112,
    name: "Kho Lak",
    address: "160 Y Moan, TP BMT",
    describe: "Mô tả tất cả mọi thứ ở đây",
  },
  {
    id: 10113,
    name: "Kho Ekao",
    address: "111 Phạm Ngũ Lão, TP BMT",
    describe: "Mô tả tất cả mọi thứ ở đây",
  },
];

// Các cột của bảng
const columns = [
  { label: "ID", field: "id" },
  { label: "Tên kho", field: "name" },
  { label: "Địa chỉ", field: "address" },
  { label: "Mô tả", field: "describe" },
];

export default function WarehousePage() {
  const handleEdit = (index) => {
    console.log("Edit", index);
  };

  const handleDelete = (index) => {
    console.log("Delete", index);
  };

  return (
    <>
      <ReusableTable
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        data={initialData}
        columns={columns}
        navigate={"/dashboard/warehouse/create"}
      />
    </>
  );
}
