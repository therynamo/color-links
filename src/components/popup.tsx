import React, { useCallback, useState, useEffect } from 'react';

import WhitelistManager from './whitelist';
import ColorButton from './colorButton';
import CustomInput from './customInput';
import { useActiveColor } from './useActiveColor';
import { saveActiveColor, getCurrentUrl } from '../helpers/chrome';
import { modifyWhiteList } from '../helpers/whitelisting';

export const colors = ['#37d67a', '#2ccce4', '#06A77D', '#ff8a65', '#1E91D6'];

const Popup = () => {
  const [showCustomInput, setShowCustomInput] = useState(false);

  const [currentColor, setCurrentColor] = useActiveColor();

  useEffect(() => {
    setShowCustomInput(currentColor ? !colors.includes(currentColor) : false);
  }, [currentColor]);

  const onColorChange = useCallback(
    (color: string) => {
      saveActiveColor(color);
      setCurrentColor(color);
      setShowCustomInput(false);

      async function modify() {
        const url = await getCurrentUrl();
        await modifyWhiteList({ url, color });
      }

      modify();
    },
    [setCurrentColor]
  );

  return (
    <div className="colorLinks">
      <span
        style={{
          color: currentColor,
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
            active={color === currentColor}
          />
        ))}

        <div>
          <button
            type="button"
            aria-label="custom color"
            className={`colorLinks--button${!colors.includes(currentColor) ? ' active' : ''}`}
            onClick={() => setShowCustomInput(true)}
          >
            #
          </button>
        </div>
      </div>

      {showCustomInput && <CustomInput color={currentColor} saveHandler={onColorChange} />}
      <WhitelistManager />
    </div>
  );
};

export default Popup;
