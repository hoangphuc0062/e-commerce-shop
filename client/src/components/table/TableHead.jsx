/* eslint-disable react/prop-types */

function TableHeader({ columns }) {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {columns.map((col) => (
          <th
            key={col.id}
            scope="col"
            className={`px-6 py-3 ${col.isFirst ? 'rounded-s-lg' : ''} ${col.isLast ? 'rounded-e-lg' : ''}`}
          >
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
