import React, { FC } from 'react';

interface OwnProps {
  color: string;
  clickHandler: () => void;
  active: boolean;
}

const ColorButton: FC<OwnProps> = ({ color, clickHandler, active }) => (
  <div>
    <button
      aria-label="save color"
      type="button"
      className={`colorLinks--button${active ? ' active' : ''}`}
      onClick={clickHandler}
      style={{ color: 'white', background: color }}
    />
  </div>
);

export default ColorButton;
