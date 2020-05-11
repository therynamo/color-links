import React from 'react';

const ColorButton = ({ color }) => (
  <div>
    <button
      className={`colorLinks--button${this.props.active ? ' active' : ''}`}
      onClick={this.props.clickHandler}
      style={{ color: 'white', background: color }}
      ref="button"
    ></button>
  </div>
);

export default ColorButton;
