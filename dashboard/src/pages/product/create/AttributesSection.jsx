import {
  Grid,
  TextField,
  Button,
  Typography,
  TextareaAutosize,
  TableRow,
  TableCell,
  Collapse,
  IconButton,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  Select,
  MenuItem,
  Chip,
  ListItemText,
  FormControl,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function AttributesSection({
  attributeData,
  productData,
  handleAttributeChange,
  handleAddAttribute,
  handleDeleteAttribute, // Thêm hàm xóa thuộc tính
  handleEditAttribute,
  attributesSelect,
}) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleToggleExpand = (index) =>
    setExpandedIndex(expandedIndex === index ? null : index);
  const handleSaveEdit = () => {
    // Cập nhật thuộc tính đã chỉnh sửa vào productData
    const updatedAttributes = [...productData.attributes];
    updatedAttributes[editingIndex] = { ...attributeData };
    handleAddAttribute(updatedAttributes);
    setEditingIndex(null); // Reset trạng thái sau khi lưu
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="aid">Thuộc tính</InputLabel>
            <Select
              id="aid"
              label="Thuộc tính"
              fullWidth
              value={attributeData.aid}
              onChange={(e) => handleAttributeChange("aid", e.target.value)}
            >
              {attributesSelect?.map((item, i) => (
                <MenuItem key={i} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="value">Giá trị</InputLabel>
            <Select
              id="value"
              label="Giá trị"
              fullWidth
              value={attributeData.value}
              onChange={(e) => handleAttributeChange("value", e.target.value)}
            >
              {attributesSelect
                .find((attr) => attr.id === attributeData.aid)
                ?.values.map((value) => (
                  <MenuItem key={value.value} value={value.value}>
                    <div
                      style={{
                        background: value.value,
                        width: "100%",
                      }}
                    >
                      {value.value}
                    </div>
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="SKU"
            fullWidth
            value={attributeData.SKU}
            onChange={(e) => handleAttributeChange("SKU", e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            label="Giá thị trường (thuộc tính)"
            fullWidth
            type="number"
            value={attributeData.priceInMarket}
            onChange={(e) =>
              handleAttributeChange("priceInMarket", e.target.value)
            }
          />
        </Grid>
        <Grid item xs={4}>
          <TextareaAutosize
            placeholder="Danh sách ảnh (URL), ngăn cách bởi dấu phẩy"
            minRows={2}
            style={{ width: "100%" }}
            value={attributeData.images.join(", ")}
            onChange={(e) =>
              handleAttributeChange("images", e.target.value.split(", "))
            }
          />
        </Grid>
      </Grid>

      {/* Kiểm tra nếu đang chỉnh sửa thì hiện nút Lưu */}
      {editingIndex !== null ? (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveEdit}
            style={{ marginTop: "20px" }}
          >
            Lưu chỉnh sửa
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddAttribute}
          style={{ marginTop: "20px" }}
        >
          Thêm thuộc tính
        </Button>
      )}

      <div>
        <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
          Thuộc tính đã thêm:
        </Typography>
        {productData.attributes.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID thuộc tính</TableCell>
                  <TableCell>Giá trị</TableCell>
                  <TableCell>SKU</TableCell>
                  <TableCell>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productData.attributes.map((attr, index) => (
                  <React.Fragment key={index}>
                    {/* Hàng hiển thị thông tin thuộc tính */}
                    <TableRow>
                      <TableCell>{attr.aid}</TableCell>
                      <TableCell>{attr.value}</TableCell>
                      <TableCell>{attr.SKU}</TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleToggleExpand(index)}>
                          <ExpandMoreIcon
                            style={{
                              transform:
                                expandedIndex === index
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                              transition: "transform 0.3s",
                            }}
                          />
                        </IconButton>
                        <IconButton onClick={() => handleEditAttribute(index)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteAttribute(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>

                    {/* Collapse để hiển thị chi tiết nếu có */}
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Collapse
                          in={expandedIndex === index}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Grid
                            container
                            spacing={2}
                            style={{ padding: "10px" }}
                          >
                            <Grid item xs={6}>
                              <Typography variant="subtitle1">
                                Giá thị trường: {attr.priceInMarket}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="subtitle1">
                                Danh sách ảnh: {attr.images.join(", ")}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>Chưa có thuộc tính nào được thêm.</Typography>
        )}
      </div>
    </>
  );
}
