import React from 'react';
import ColorButton from './colorButton.jsx';

const colors = ['green', 'blue', 'red', 'orange', 'cyan'];

export default class Popup extends React.Component {
  onClickHandler(color) {
    chrome.tabs.query({ active: true, currentWindow: true }, function tabsQuery(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { color }, function tabsSendMessage() {});
    });
  }

  render() {
    return (
      <div className="container">
          <div className="row">
            <div className="twelve columns">
              {
                colors.map((color) => {
                  return (
                    <ColorButton
                      color={color}
                      clickHandler={this.onClickHandler.bind(this, color)}
                      key={color}
                    />
                  );
                })
              }
            </div>
          </div>
      </div>
    );
  }
}
