import ReusableTable from "../../components/Table";

export default function CollectionPage() {
  const columns = [
    { label: "Tên bộ sưu tập", field: "name" },
    { label: "tiêu đề ", field: "titleSEO" },
    { label: "từ khóa", field: "keywordsSEO" },
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
      name: "Bộ sưu tập 1",
      titleSEO: "title 1",
      keywordsSEO: "keyword 1",
      descriptionSEO: "description 1",
      slug: "slug 1",
      brand: "1",
    },
  ];

  return (
    <>
      <ReusableTable
        columns={columns}
        data={items}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
}
