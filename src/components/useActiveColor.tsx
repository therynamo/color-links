import { useEffect, useState, Dispatch, SetStateAction } from 'react';

import { getActiveColor, getCurrentUrl } from '../helpers/chrome';
import { getWhitelist, WhiteList } from '../helpers/whitelisting';

export const useActiveColor = (): [string, Dispatch<SetStateAction<string>>] => {
  const [activeColor, setActiveColor] = useState('');

  useEffect(() => {
    async function getActiveColorEffect() {
      let color = '';
      let whiteList = [] as WhiteList[];
      let url = '';

      try {
        color = await getActiveColor();

        whiteList = await getWhitelist();
        url = await getCurrentUrl();
      } catch (e) {
        console.log('Unable to validate color.');
      }

      const { color: urlColor } = whiteList.find((list) => list.url === url) || ({} as WhiteList);

      setActiveColor(urlColor ?? color);
    }

    getActiveColorEffect();
  });

  return [activeColor, setActiveColor];
};
