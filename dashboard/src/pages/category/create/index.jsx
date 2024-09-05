import ReusableForm from "../../../components/form";

function AddCategory() {
  const fields = [
    {
      name: "name",
      label: "Name",
      required: true,
      xs: 12,
      sm: 6,
      md: 4,
      lg: 3,
      xl: 3,
    },
    {
      name: "email",
      label: "Email",
      required: true,
      type: "email",
      xs: 12,
      sm: 6,
      md: 4,
      lg: 3,
      xl: 3,
    },
    {
      name: "age",
      label: "Age",
      required: false,
      type: "number",
      xs: 12,
      sm: 6,
      md: 4,
      lg: 3,
      xl: 3,
    },
    {
      name: "address",
      label: "Address",
      required: false,
      xs: 12,
      sm: 6,
      md: 4,
      lg: 3,
      xl: 3,
    },
    {
      name: "city",
      label: "City",
      required: false,
      xs: 12,
      sm: 6,
      md: 6,
      lg: 6,
      xl: 6,
    },
  ];

  const initialValues = {
    name: "",
    email: "",
    age: "",
    address: "",
    city: "",
  };

  const handleSubmit = (formData) => {
    console.log("Form submitted with values:", formData);
  };

  const formStyles = {
    backgroundColor: "#f0f0f0",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    margin: "auto",
  };

  const fieldStyles = {
    backgroundColor: "#fff",
    borderRadius: 2,
  };

  const buttonStyles = {
    backgroundColor: "#1976d2",
    "&:hover": {
      backgroundColor: "#115293",
    },
    padding: "10px 20px",
    fontSize: "16px",
  };

  return (
    <div>
      <ReusableForm
        fields={fields}
        onSubmit={handleSubmit}
        initialValues={initialValues}
        title="Custom Form"
        formStyles={formStyles}
        fieldStyles={fieldStyles}
        buttonStyles={buttonStyles}
      />
    </div>
  );
}

export default AddCategory;
