import React from 'react';
import WhitelistManager from './whitelist.jsx';
import ColorButton from './colorButton.jsx';
const colors = [
  '#37d67a',
  '#2ccce4',
  '#06A77D',
  '#ff8a65',
  '#1E91D6'
];

export default class Popup extends React.Component {
  constructor() {
    super();
    this.state = {
      activeColor: ''
    };
  }

  componentDidMount() {
    this.getActiveColor()
      .then((activeColor) => {
        this.setState({ activeColor });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onClickHandler(color) {
    chrome.tabs.query({ active: true, currentWindow: true }, function tabsQuery(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { color }, function tabsSendMessage() {});
    });
    this.setState({ activeColor: color });
  }

  getActiveColor() {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get('color', (results) => {
        if (results.color) {
          resolve(results.color);
        } else {
          reject(new Error('Did Not Receive Color'));
        }
      });
    });
  }

  render() {
    return (
      <div className="colorLinks">
        <span style={{
          color: this.state.activeColor,
          paddingBottom: '5px',
          transition: 'color .5s'
        }}
        >
         A Quick Brown Fox Jumped
        </span>
        <div className="colorLinks--grid">
                    {
            colors.map((color) => {
              return (
                <ColorButton
                  ref={color}
                  color={color}
                  clickHandler={this.onClickHandler.bind(this, color)}
                  key={color}
                />
              );
            })
          }
        </div>
        <WhitelistManager color={this.state.activeColor} />
      </div>
    );
  }
}
