![ ](https://travis-ci.org/therynamo/color-links.svg?branch=master)
Color Links ![ ](./public/images/links.png)
===

### Initial Problem

Browsing google as a color-blind individual, it becomes frustrating after a while not
knowing if you've already visited a link or not.

### Solution

Color Links aims to make it a bit easier to search google, for the color-blind.
This chrome extension allows you to browse google with full awareness of which links
you've clicked.

Development
===

To get started, clone the project and change into the root directory.

### Getting Started

```shell
nvm use
npm i
npm run lint
```

### Running The Project

#### Dev Mode

For development, you'll want to run a few commands to get going.
```shell
gulp build:dev   # build content scripts
gulp webpack:dev # build popup components
npm run dev      # watch files and build above two commands every change
```

Adding the extension to chrome is as easy as visiting `chrome://extensions`, verifying that you are in `developer mode` and then clicking `Load unpacked extension...`. Once you've done this, navigate to the root directory of the project and select the entire folder. This will generate the extension for you, and you should see the color-links logo up in your toolbar.

#### Prod
```shell
npm run build # builds the extension in its entirety and creates a dist folder along with colorlinks.zip
```

**note**: if you'd like to test your prod build, you should add the dist folder of the project, not the entire working directory, when doing a `Load unpacked extension...`. 

Contributing
===

If you'd like to contribute to this repository, feel free, just fork the project and make a pull request.

Todo
===

- Create hex input or slider (pr's welcome)

License
===

The MIT License (MIT)
Copyright (c) <year> <copyright holders>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
