import React, { useState, useEffect, useCallback } from 'react';
import { getWhitelist, removeUrlFromWhitelist, addUrlToWhitelist } from '../helpers/whitelisting';
import { getCurrentUrl, reloadCurrentTab } from '../helpers/chrome';

const WhitelistManager = () => {
  const [isActive, setIsActive] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    async function initializeWhitelist() {
      const currentUrl = await getCurrentUrl();
      setUrl(currentUrl);

      let urls = null;

      try {
        urls = await getWhitelist();
      } catch (e) {
        console.log(e);
      }

      setIsActive(urls.some((u) => u === currentUrl));
    }

    initializeWhitelist();
  }, []);

  const handleOnRemove = useCallback(() => {
    setIsActive((prevState) => !prevState);

    async function removeUrl() {
      try {
        removeUrlFromWhitelist(url);
      } catch (e) {
        console.log(e);
      }

      reloadCurrentTab();
    }

    removeUrl();
  }, [url]);

  const handleOnClick = useCallback(() => {
    setIsActive((prevState) => !prevState);

    async function addUrl() {
      try {
        addUrlToWhitelist(url);
      } catch (e) {
        console.log(e);
      }

      reloadCurrentTab();
    }

    addUrl();
  }, [url]);

  return (
    <div className="whitelist--wrapper">
      <input
        data-testid="whitelist-checkbox"
        onChange={isActive ? handleOnRemove : handleOnClick}
        className="toggle whitelist--toggle"
        id="cb4"
        type="checkbox"
        checked={isActive}
      />
      <label aria-label="whitelist toggle" className="whitelist--toggle-label" htmlFor="cb4" />
    </div>
  );
};

export default WhitelistManager;
