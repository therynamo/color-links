import React, { useCallback, useState, useEffect } from 'react';

import WhitelistManager from './whitelist';
import ColorButton from './colorButton';
import CustomInput from './customInput';
import { getActiveColor, saveActiveColor } from '../helpers/chrome';
import { COLORS } from '../constants/colors';

const Popup = () => {
  const [activeColor, setActiveColor] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const onColorChange = useCallback((color) => {
    saveActiveColor(color);
    setActiveColor(color);
  }, []);

  const toggleDetails = useCallback(() => {
    setShowCustomInput(!showCustomInput)
  },[]);

  useEffect(() => {
    async function getActiveColorEffect() {
      let result = '';

      try {
        result = await getActiveColor();
      } catch (e) {
        console.log('Did Not Receive Color');
      }

      setActiveColor(result);
    }

    getActiveColorEffect();
  }, []);

  return (
    <div className="colorLinks">
      <h1
        style={{
          color: activeColor,
      }}
      >
        <img aria-hidden="true" src="../links48.png" />
        <span>color links</span>
      </h1>
      <div className="colorLinks--grid">
        {COLORS.map((color) => (
          <ColorButton
            color={color}
            clickHandler={() => onColorChange(color)}
            key={color}
            active={color === activeColor}
          />
        ))}
      </div>

      <details>
        <summary>
          custom color
        </summary>
        <CustomInput color={activeColor} saveHandler={onColorChange} />
      </details>
      <WhitelistManager />
    </div>
  );
};

export default Popup;
