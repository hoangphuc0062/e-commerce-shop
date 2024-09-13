import React from 'react'
import ReusableTable from '../../components/table';
const handleEdit = (index) => {
    console.log("Edit", index);
};
const handleDelete = (index) => {
    console.log("Delete", index);
};
const initialData = [
    {
        id: 10111,
        name: "Kho  tây nguyên",
        address: " 28 Ywang, TP BMT",
        describe: " Mô tả tất cả mọi thứ ở đây",
    },
    {
        id: 10112,
        name: "Kho lak",
        address: " 160 Y moan TP BMT",
        describe: " Mô tả tất cả mọi thứ ở đây",
    },
    {
        id: 10113,
        name: "Kho Ekao",
        address: " 111 Phạm ngũ lão, TP BMT",
        describe: " Mô tả tất cả mọi thứ ở đây",
    }
]
const columns = [
    { label: " ID", field: "id" },
    { label: "Tên kho", field: "name" },
    { label: "Địa chỉ", field: "address" },
    { label: "Mô tả", field: "describe" },
];
export default function WarehousePage() {
    return (
        <>
            <ReusableTable
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                data={initialData}
                columns={columns}
            />
        </>
    )
}
