import React, { useState, FC } from 'react';

interface OwnProps {
  color: string;
  saveHandler: (color: string) => void;
}

const CustomInput: FC<OwnProps> = ({ color, saveHandler }) => {
  const [currentColor, setCurrentColor] = useState(color);

  return (
    <form
      className="customForm"
      data-testid="form"
      onSubmit={() => saveHandler(currentColor)}
    >
      <label className="customForm--label" htmlFor="custominput">enter hexadecimal value</label>
      <div className="customForm--clickables">
        <input
          data-testid="custom input"
          id="custominput"
          onChange={(e) => setCurrentColor(e.target.value)}
          value={currentColor}
        />
        {' '}
        <button data-testid="save button" type="submit">save</button>
        <p>
          current color:
          <b style={{ color }}>{color}</b>
        </p>
      </div>
    </form>
  );
};

export default CustomInput;
