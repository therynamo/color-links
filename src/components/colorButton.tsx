import React, { FC } from 'react';

interface OwnProps {
  color: string;
  clickHandler: () => void;
  active: boolean;
}

const ColorButton: FC<OwnProps> = ({ color, clickHandler, active }) => (
  <div>
    <button
      data-testid="color button"
      type="button"
      className={`colorLinks--button${active ? ' active' : ''}`}
      onClick={clickHandler}
      style={{ background: color }}
    />
  </div>
);

export default ColorButton;
