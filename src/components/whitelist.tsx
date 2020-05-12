import React, { useState, useEffect, useCallback } from 'react';
import WhitelistClass from '../helpers/Whitelist';
import { getCurrentUrl, reloadCurrentTab } from '../helpers/chrome';

const Whitelist = new WhitelistClass();

const WhitelistManager = () => {
  const [isActive, setIsActive] = useState(false);
  const [url, setUrl] = useState('');

  useEffect(() => {
    async function initializeWhitelist() {
      setUrl(await getCurrentUrl());

      let urls = null;

      try {
        urls = await Whitelist.getWhitelist();
      } catch (e) {
        console.log(e);
      }

      setIsActive(urls.some((u) => u === url));
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
  }, []);

  const handleOnClick = useCallback((e) => {
    e.preventDefault();
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
  }, []);

  return (
    <div className="whitelist--wrapper">
      <span className="whitelist--text">{url}</span>
      <label className="whitelist--toggle-label" htmlFor="cb4" />
      <input
        onChange={isActive ? handleOnRemove : handleOnClick}
        className="toggle whitelist--toggle"
        id="cb4"
        type="checkbox"
        checked={isActive}
      />
    </div>
  );
};

export default WhitelistManager;
