import React from 'react'

const TextBgrWhite = ({text}) => {
  return (
    <div>
      <p className="text-gray-700 p-4 bg-white rounded-lg">
        {text}
      </p>
    </div>
  );
}

export default TextBgrWhite
