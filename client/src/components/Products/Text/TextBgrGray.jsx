import React from 'react'

const TextBgrGray = ({text}) => {
  return (
    <div>
      <p className="text-gray-700 p-4 bg-gray-100 rounded-lg">
        {text}
      </p>
    </div>
  );
}

export default TextBgrGray
