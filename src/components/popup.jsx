import React from 'react';
import { findDOMNode } from 'react-dom';
import ColorButton from './colorButton.jsx';
const colors = ['green', 'blue', 'red', 'orange', 'cyan'];

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
        findDOMNode(this.refs[activeColor].refs.button).focus();
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
      <div className="colorLinks" style={{ 'border': `solid ${this.state.activeColor} 4px` }}>
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
      </div>
    );
  }
}
