/* eslint-disable react/prop-types */
import { TableRow, TableCell, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { StatusChip } from "../StatusColor";

const TableRowComponent = ({
  row,
  handleDelete,
  columns,
  handleEdit,
  handleEye,
}) => (
  <TableRow>
    {columns.map((column, index) => (
      <TableCell
        key={index}
        sx={
          column.field === "status"
            ? {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "0.75rem",
              }
            : {}
        }
      >
        {column.field === "status" ? (
          <StatusChip status={row[column.field]} />
        ) : (
          row[column.field] || "N/A"
        )}
      </TableCell>
    ))}
    <TableCell>
      {handleEye && (
        <Tooltip title="Xem">
          <IconButton color="primary" onClick={() => handleEye(row)}>
            <RemoveRedEyeIcon />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title="Chỉnh Sửa">
        <IconButton color="primary" onClick={() => handleEdit(row)}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Xóa">
        <IconButton sx={{ color: "red" }} onClick={() => handleDelete(row)}>
          <Delete />
        </IconButton>
      </Tooltip>
    </TableCell>
  </TableRow>
);

export default TableRowComponent;
