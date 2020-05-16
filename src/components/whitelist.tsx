import React, { useState, useEffect, useCallback } from 'react';
import WhitelistClass from '../helpers/Whitelist';
import { getCurrentUrl, reloadCurrentTab } from '../helpers/chrome';

const Whitelist = new WhitelistClass();

const WhitelistManager = () => {
  const [isActive, setIsActive] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    async function initializeWhitelist() {
      const currentUrl = await getCurrentUrl();
      setUrl(currentUrl);

      let urls = null;

      try {
        urls = await Whitelist.getWhitelist();
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
        Whitelist.removeUrlFromWhitelist(url);
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
        Whitelist.addUrlToWhitelist(url);
      } catch (e) {
        console.log(e);
      }

      reloadCurrentTab();
    }

    addUrl();
  }, [url]);

  return (
    <div className="whitelist--wrapper">
      <span className="whitelist--text">{url}</span>
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
