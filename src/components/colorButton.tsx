import React from 'react';

interface OwnProps {
  color: string;
  clickHandler: () => void;
  active: boolean;
}

const ColorButton = ({ color, clickHandler, active }) => (
  <div>
    <button
      className={`colorLinks--button${active ? ' active' : ''}`}
      onClick={clickHandler}
      style={{ color: 'white', background: color }}
      ref="button"
    ></button>
  </div>
);

export default ColorButton;
