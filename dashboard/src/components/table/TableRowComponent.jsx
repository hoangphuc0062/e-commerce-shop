import { useState } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Button,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { StatusChip } from "../StatusColor";
import propTypes from "prop-types";

const TableRowComponent = ({
  row,
  handleDelete = () => {},
  columns,
  handleEdit = () => {},
  handleEye = () => {},
}) => {
  const maxSubcategories = 3;
  const [showAll, setShowAll] = useState(false);

  return (
    <TableRow
      sx={{
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      {columns.map((column, index) => (
        <TableCell
          key={index}
          sx={{
            verticalAlign: "middle",
            padding: "8px",
          }}
        >
          {column.field === "status" && row[column.field] ? (
            <StatusChip status={row[column.field]} />
          ) : column.field === "subcategoryName" ? (
            row.subcategories && row.subcategories.length > 0 ? (
              <Box sx={{ maxWidth: "300px", transition: "all 0.3s ease" }}>
                <Box
                  sx={{
                    maxHeight: showAll ? "none" : "60px",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                  }}
                >
                  <ul
                    style={{
                      listStyleType: "none",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {(showAll
                      ? row.subcategories
                      : row.subcategories.slice(0, maxSubcategories)
                    ).map((sub) => (
                      <li
                        key={sub.subcategoryId}
                        style={{ paddingBottom: "4px" }}
                      >
                        {sub.name}
                      </li>
                    ))}
                  </ul>
                </Box>
                {row.subcategories.length > maxSubcategories && (
                  <Button
                    variant="text"
                    color="primary"
                    onClick={() => setShowAll(!showAll)}
                    sx={{
                      textTransform: "none",
                      padding: 0,
                      fontSize: "0.8rem",
                    }}
                  >
                    {showAll
                      ? "Xem ít hơn"
                      : `Xem thêm (${
                          row.subcategories.length - maxSubcategories
                        } danh mục)`}
                  </Button>
                )}
              </Box>
            ) : (
              "No Subcategories"
            )
          ) : column.field === "subcategoryStatus" ? (
            row.subcategories && row.subcategories.length > 0 ? (
              <Box
                sx={{
                  maxWidth: "300px",
                  transition: "all 0.3s ease",
                }}
              >
                <Box
                  sx={{
                    maxHeight: showAll ? "none" : "60px",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                    padding: "20px 0",
                  }}
                >
                  <ul
                    style={{
                      listStyleType: "none",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    {(showAll
                      ? row.subcategories
                      : row.subcategories.slice(0, maxSubcategories)
                    ).map((sub) => (
                      <li
                        key={sub.subcategoryId}
                        style={{ paddingBottom: "10px" }}
                      >
                        <StatusChip status={sub.status} />
                      </li>
                    ))}
                  </ul>
                </Box>
              </Box>
            ) : (
              "No Subcategory Status"
            )
          ) : typeof row[column.field] === "object" ? (
            "" // Do not render JSON string
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

        {handleEdit && (
          <Tooltip title="Chỉnh Sửa">
            <IconButton color="primary" onClick={() => handleEdit(row)}>
              <Edit />
            </IconButton>
          </Tooltip>
        )}

        {handleDelete && (
          <Tooltip title="Xóa">
            <IconButton sx={{ color: "red" }} onClick={() => handleDelete(row)}>
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
