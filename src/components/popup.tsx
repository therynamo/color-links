import React, { useCallback, useState, useEffect } from 'react';

import WhitelistManager from './whitelist';
import ColorButton from './colorButton';
import CustomInput from './customInput';
import { getActiveColor, saveActiveColor } from '../helpers/chrome';
import { COLORS } from '../constants/colors';

// export const colors = ['#37d67a', '#2ccce4', '#06A77D', '#ff8a65', '#1E91D6'];

const Popup = () => {
  const [activeColor, setActiveColor] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const onColorChange = useCallback((color) => {
    saveActiveColor(color);
    setActiveColor(color);
    setShowCustomInput(false);
  }, []);

  useEffect(() => {
    async function getActiveColorEffect() {
      let result = '';

      try {
        result = await getActiveColor();
      } catch (e) {
        console.log('Did Not Receive Color');
      }

      setActiveColor(result);
      setShowCustomInput(!COLORS.includes(result));
    }

    getActiveColorEffect();
  }, []);

  return (
    <div className="colorLinks">
      <h1>color links</h1>
      <span
        style={{
          color: activeColor,
        }}
        className="colorLinks--demo"
      >
        A Quick Brown Fox Jumped
      </span>
      <div className="colorLinks--grid">
        {COLORS.map((color) => (
          <ColorButton
            color={color}
            clickHandler={() => onColorChange(color)}
            key={color}
            active={color === activeColor}
          />
        ))}

        <div>
          <button
            type="button"
            aria-label="custom color"
            className={`colorLinks--button${!COLORS.includes(activeColor) ? ' active' : ''}`}
            onClick={() => setShowCustomInput(true)}
          >
            #
          </button>
        </div>
      </div>

      {showCustomInput && <CustomInput color={activeColor} saveHandler={onColorChange} />}
      <WhitelistManager />
    </div>
  );
};

export default Popup;
