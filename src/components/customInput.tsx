import React, { useState, FC } from 'react';

interface OwnProps {
  color: string;
  saveHandler: (color: string) => void;
}

const CustomInput: FC<OwnProps> = ({ color, saveHandler }) => {
  const [currentColor, setColor] = useState(color);

  return (
    <form
      aria-label="custom-form"
      className="colorLinks--custom"
      onSubmit={() => saveHandler(currentColor)}
    >
      <input
        placeholder="#ff0000"
        aria-label="custom-input"
        value={currentColor}
        onChange={(e) => setColor(e.target.value)}
      />
      <button type="submit" onClick={() => saveHandler(currentColor)}>
        Save
      </button>
    </form>
  );
};

export default CustomInput;
