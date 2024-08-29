/* eslint-disable react/prop-types */

const TableHead = ({ headLabel }) => {
  return (
    <thead>
      <tr>
        {headLabel.map((column) => (
          <th key={column.id} align={column.align || 'left'}>
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
