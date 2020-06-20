import React, { useState, FC } from 'react';

interface OwnProps {
  color: string;
  saveHandler: (color: string) => void;
}

const CustomInput: FC<OwnProps> = ({ color, saveHandler }) => {
  const [currentColor, setColor] = useState(color);

  return (
    <form
      className="customForm"
      onSubmit={() => saveHandler(currentColor)}
    >
      <label className="customForm--label">enter hexadecimal value</label>
      <div className="customForm--clickables">
        <input
          aria-label="custom input"
          value={currentColor}
          onChange={(e) => setColor(e.target.value)}
        />
        {' '}
        <button type="submit">save</button>
        <p>
          current color:
          <b style={{ color }}>{color}</b>
        </p>
      </div>
    </form>
  );
};

export default CustomInput;
