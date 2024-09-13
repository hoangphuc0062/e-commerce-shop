import { useState } from "react";
import CustomCheckbox from "../components/Checkbox";
import CustomButton from "../components/Button";
import CustomDropdown from "../components/Dropdown";
import CustomInputField from "../components/InputField";

const ExampleForm = () => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [errors, setErrors] = useState({
    checkbox: false,
    dropdown: false,
    input: false,
  });

  const validateForm = () => {
    const newErrors = {
      checkbox: !checkboxChecked,
      dropdown: !dropdownValue,
      input: !inputValue,
    };
    setErrors(newErrors);
    return !newErrors.checkbox && !newErrors.dropdown && !newErrors.input;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log("Name:", inputValue);
      console.log("Option:", dropdownValue);
    } else {
      console.error("Form has errors");
    }
  };

  return (
    <div>
      <CustomCheckbox
        label="Agree to Terms"
        checked={checkboxChecked}
        onChange={(e) => setCheckboxChecked(e.target.checked)}
        helperText={errors.checkbox ? "Please agree to the terms" : ""}
        error={errors.checkbox}
      />

      <CustomDropdown
        label="Select Option"
        options={[
          { value: "option1", label: "Option 1" },
          { value: "option2", label: "Option 2" },
        ]}
        value={dropdownValue}
        onChange={(e) => setDropdownValue(e.target.value)}
        helperText={errors.dropdown ? "Please select an option" : ""}
        error={errors.dropdown}
      />

      <CustomInputField
        label="Enter Name"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        helperText={errors.input ? "Please enter a name" : ""}
        error={errors.input}
      />

      <CustomButton label="Submit" onClick={handleSubmit} />
    </div>
  );
};

export default ExampleForm;
