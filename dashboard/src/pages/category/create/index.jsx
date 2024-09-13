import { Box, Card } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import CustomInputField from "../../../components/InputField";
import { useState } from "react";

function AddCategory() {
  const [category, setCategory] = useState({
    name: "",
    description: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    description: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      name: !category.name,
      description: !category.description,
    };
    setErrors(newErrors);
    if (!newErrors.name && !newErrors.description) {
      console.log("Category Name:", category.name);
      console.log("Category Description:", category.description);
    } else {
      console.error("Form has errors");
    }
  };

  return (
    <>
      <Box>
        <h1>Add Category</h1>
        <Card>
          <form>
            <Row>
              <Col md={6}>
                <CustomInputField
                  label="Category Name"
                  value={category.name}
                  onChange={(e) =>
                    setCategory({ ...category, name: e.target.value })
                  }
                  helperText={errors.name ? "Please enter a name" : ""}
                  error={errors.name}
                />
              </Col>
              <Col md={6}>
                <CustomInputField
                  label="Category Description"
                  value={category.description}
                  onChange={(e) =>
                    setCategory({ ...category, description: e.target.value })
                  }
                  helperText={
                    errors.description ? "Please enter a description" : ""
                  }
                />
              </Col>
            </Row>
          </form>
        </Card>
      </Box>
    </>
  );
}
export default AddCategory;
