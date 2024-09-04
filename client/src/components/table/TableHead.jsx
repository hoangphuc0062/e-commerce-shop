/* eslint-disable react/prop-types */
const TableHead = ({ columns }) => {
  return (
     <thead className="bg-gray-200 dark:bg-gray-700">
      <tr>
        {columns.map((column, index) => (
          <th key={index} className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">
            {column}
          </th>
        ))}
        <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-300">Actions</th>
      </tr>
    </thead>
  );
};

export default TableHead;
