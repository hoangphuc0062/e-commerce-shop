/* eslint-disable react/prop-types */

const TableBody = ({ data, headLabel }) => {
  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {headLabel.map((column) => (
            <td key={column.id} align={column.align || 'left'}>
              {row[column.id]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
