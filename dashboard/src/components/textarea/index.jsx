import { Editor } from "@tinymce/tinymce-react";
import PropTypes from "prop-types";

const apiKey = import.meta.env.VITE_TINY_API_KEY;

export default function Textarea({
  label,
  value,
  onChange,
  error,
  errorMessage,
  height,
}) {
  return (
    <div>
      <label
        style={{ display: "block", marginBottom: "8px", fontWeight: "bold" }}
      >
        {label}
      </label>
      <div
        style={{
          border: error ? "2px solid red" : "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <Editor
          apiKey={apiKey}
          initialValue={value}
          init={{
            height: height,
            menubar: false,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | " +
              "bold italic backcolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style: error
              ? "body { background-color: #ffe6e6; }"
              : "body { background-color: white; }",
          }}
          onEditorChange={onChange}
          textareaName="content"
          id="editor"
        />
      </div>

      {/* Display error message */}
      {error && (
        <p style={{ color: "red", marginTop: "8px", fontSize: "12px" }}>
          {errorMessage}
        </p>
      )}
    </div>
  );
}

// Prop types validation
Textarea.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  height: PropTypes.number,
};

Textarea.defaultProps = {
  error: false,
  errorMessage: "",
  height: 500,
};
