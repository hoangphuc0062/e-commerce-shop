/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useTheme } from './../../theme/ThemeProvider';

function Dialog({ title, fields, onSubmit, onCancel }) {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: field.value || '' }), {})
  );

  useEffect(() => {
    setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: field.value || '' }), {}));
  }, [fields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditorChange = (content, editor) => {
    setFormData({ ...formData, [editor.id]: content });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto p-4 bg-white dark:bg-gray-800 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{title}</h2>
      
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label htmlFor={field.name} className="block text-gray-700 dark:text-gray-300 font-semibold mb-2">
            {field.label}
          </label>
          {field.type === 'textarea' ? (
              <Editor
                apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
                id={field.name}
                init={{
                  plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                  toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                  skin: isDarkMode ? 'oxide-dark' : 'oxide',
                  content_css: isDarkMode ? 'dark' : 'default',
                }}
                value={formData[field.name]}
                onEditorChange={handleEditorChange} 
              />
          ) : (
            <input
              id={field.name}
              name={field.name}
              type={field.type || 'text'}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={field.placeholder}
              required={field.required}
            />
          )}
        </div>
      ))}
      
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md mr-2"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Lưu
        </button>
      </div>
    </form>
  );
}

export default Dialog;
