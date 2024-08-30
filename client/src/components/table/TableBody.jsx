/* eslint-disable react/prop-types */

function TableBody({ columns, data }) {
  return (
    <tbody>
      {data.map((row, index) => (
        <tr key={index} className="bg-white dark:bg-gray-800">
          {columns.map((col) => (
            <td
              key={col.id}
              className={`px-6 py-4 ${col.isFirst ? 'font-medium text-gray-900 whitespace-nowrap dark:text-white' : ''}`}
            >
              {row[col.id]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
