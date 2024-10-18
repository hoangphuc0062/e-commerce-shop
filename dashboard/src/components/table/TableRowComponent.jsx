import {
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Avatar,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { StatusChip, StatusOrderChip, StatustPostChip } from "../StatusColor";
import propTypes from "prop-types";
import { extractTextFromHtml } from "../../utils/extractTextFromHtml";

const TableRowComponent = ({
  row,
  handleDelete,
  columns,
  handleEdit,
  handleEye,
}) => {
  return (
    <TableRow
      sx={{
        "&:hover": {
          backgroundColor: "#f0f0f0",
        },
      }}
    >
      <TableCell></TableCell>
      {columns.map((column) => (
        <TableCell
          key={column.field}
          item={row[column.field]}
          sx={{
            verticalAlign: "middle",
            padding: "4px 8px", // Reduced padding
            whiteSpace: "nowrap",
          }}
        >
          {column.field === "orderStatus" ? (
            <StatusOrderChip status={row[column.field]} />
          ) : column.field === "status" ? (
            <StatusChip status={row[column.field]} />
          ) : column.field === "statustPost" ? (
            <StatustPostChip status={row[column.field]} />
          ) : column.field === "description" ? (
            <div>
              {row[column.field].length > 50
                ? extractTextFromHtml(row[column.field].slice(0, 50) + "...")
                : extractTextFromHtml(row[column.field])}
            </div>
          ) : column.field === "image" ? (
            <Avatar
              alt={row[column.name]}
              variant="rounded"
              src={row[column.field]}
              sx={{ width: 50, height: 50 }}
            />
          ) : column.field === "images" ? (
            <Avatar
              alt={row[column.name]}
              variant="rounded"
              src={row[column.field][0]}
              sx={{ width: 50, height: 50 }}
            />
          ) : (
            row[column.field]
          )}
        </TableCell>
      ))}

      <TableCell>
        {handleEye && (
          <Tooltip title="View">
            <IconButton
              color="primary"
              onClick={() => handleEye(row)}
              sx={{ padding: "4px" }} // Reduced padding for action buttons
            >
              <RemoveRedEyeIcon />
            </IconButton>
          </Tooltip>
        )}

        {handleEdit && (
          <Tooltip title="Edit">
            <IconButton
              color="primary"
              onClick={() => handleEdit(row)}
              sx={{ padding: "4px" }} // Reduced padding for action buttons
            >
              <Edit />
            </IconButton>
          </Tooltip>
        )}

        {handleDelete && (
          <Tooltip title="Delete">
            <IconButton
              sx={{ color: "red", padding: "4px" }} // Reduced padding for action buttons
              onClick={() => handleDelete(row)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  );
};

TableRowComponent.propTypes = {
  row: propTypes.object.isRequired,
  columns: propTypes.array.isRequired,
  handleDelete: propTypes.func,
  handleEdit: propTypes.func,
  handleEye: propTypes.func,
};

export default TableRowComponent;
