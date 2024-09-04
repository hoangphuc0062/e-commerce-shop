import icons from "../../ultils/icon";

/* eslint-disable react/prop-types */
const { FaPen, MdDelete } = icons;

const TableBody = ({ data, columns, handleEdit, handleDelete }) => {
  return (
    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
      {data.map((item, rowIndex) => (
        <tr key={rowIndex} className="hover:bg-gray-100 dark:hover:bg-gray-700">
          {columns.map((column, colIndex) => {
            if (item.name && item.img && column.toLowerCase().includes('tên')) {
              return (
                <td key={colIndex} className="px-4 py-2 whitespace-nowrap text-gray-900 dark:text-gray-300">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <span>{item.name}</span>
                  </div>
                </td>
              );
            }
            return (
              <td key={colIndex} className="px-4 py-2 whitespace-nowrap text-gray-900 dark:text-gray-300">
                {item[column.toLowerCase()]}
              </td>
            );
          })}
          <td className="px-4 py-2 whitespace-nowrap text-gray-900 dark:text-gray-300 text-left">
            <button onClick={() => handleEdit(item)} className="mr-2 text-lg text-gray-600 dark:text-gray-300">
              <FaPen />
            </button>            
            <button onClick={() => handleDelete(item.id)} className="text-lg text-gray-600 dark:text-gray-300">
              <MdDelete />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
