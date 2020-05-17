import React, { useCallback, useState, useEffect } from 'react';

import WhitelistManager from './whitelist';
import ColorButton from './colorButton';
import CustomInput from './customInput';
import { getActiveColor, saveActiveColor } from '../helpers/chrome';

export const colors = ['#37d67a', '#2ccce4', '#06A77D', '#ff8a65', '#1E91D6'];

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
        /* eslint-disable-next-line no-console */
        console.log('Did Not Receive Color');
      }

      setActiveColor(result);
      setShowCustomInput(!colors.includes(result));
    }

    getActiveColorEffect();
  }, []);

  return (
    <div className="colorLinks">
      <span
        style={{
          color: activeColor,
          paddingBottom: '5px',
          transition: 'color .5s',
        }}
      >
        A Quick Brown Fox Jumped
      </span>
      <div className="colorLinks--grid">
        {colors.map((color) => (
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
            className={`colorLinks--button${!colors.includes(activeColor) ? ' active' : ''}`}
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
