/* eslint-disable react/prop-types */

import TableBody from "./TableBody";
import TableHeader from "./TableHead";


function Table({ columns, data,handleEdit, handleDelete }) {
   const filteredColumns = columns.filter(column => column.toLowerCase() !== 'img');
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <TableHeader columns={filteredColumns} />
        <TableBody columns={filteredColumns} data={data} handleEdit={handleEdit} handleDelete={handleDelete} />
      </table>
    </div>
  );
}

export default Table;
