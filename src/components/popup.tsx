import React, { useCallback, useState, useEffect } from 'react';

import WhitelistManager from './whitelist';
import ColorButton from './colorButton';
import CustomInput from './customInput';
const colors = ['#37d67a', '#2ccce4', '#06A77D', '#ff8a65', '#1E91D6'];

const Popup = () => {
  const [activeColor, setActiveColor] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const onColorChange = useCallback((color) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function tabsQuery(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { color }, function tabsSendMessage() {});
    });

    setActiveColor(color);
    setShowCustomInput(false);
  }, []);

  useEffect(() => {
    async function getActiveColor() {
      let result = '';

      try {
        result = await new Promise((resolve, reject) => {
          chrome.storage.sync.get('color', (results) => {
            if (results.color) {
              resolve(results.color);
            } else {
              reject();
            }
          });
        });
      } catch (e) {
        throw new Error('Did Not Receive Color');
      }

      if (!colors.includes(activeColor)) setShowCustomInput(true);

      setActiveColor(result);
    }

    getActiveColor();
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
        {colors.map((color) => {
          return (
            <ColorButton
              color={color}
              clickHandler={() => onColorChange(color)}
              key={color}
              active={color === activeColor}
            />
          );
        })}

        <div>
          <button
            className={`colorLinks--button${!colors.includes(activeColor) ? ' active' : ''}`}
            onClick={() => setShowCustomInput(true)}
            ref="button"
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
