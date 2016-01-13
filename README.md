![ ](https://travis-ci.org/therynamo/color-links.svg?branch=master)
Color Links ![ ](./public/images/links.png)
===

### Initial Problem

Browsing google as a color-blind individual, it becomes frustrating after a while not
knowing if you've already visited that link or not.

### Solution

Color Links intends to make it a bit easier to search google, for the color-blind.
This chrome extension allows you to browse google with full awareness of which links
you've clicked.

# Development

To get started, clone the project and change into the root directory.

### Getting Started

```bash
nvm use
npm i
npm test
```

### Running The Project

```bash
webpack
```

Running webpack will produce a `popup.js` bundle. This bundle is used by the chrome extension popup to render itself.

Adding the extension to chrome is as easy as visiting `chrome://extensions`, verifying that you are in `developer mode` and then clicking `Load unpacked extension...`. Once you've done this, navigate to the root directory of the project and select the entire folder. This will generate the extension for you, and you should see the color-links logo up in your toolbar.

Todo
===

- Style popup with better buttons
- Create hex input or slider
