import React from 'react';

export default class Popup extends React.Component {
  onClickHandler() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      console.log('Sent Color Request');
      chrome.tabs.sendMessage(tabs[0].id, { color: 'green' }, function(response) {
        console.log('Response Color Set');
      });
    });
  }

  render() {
    return (
      <div className="container">
          <div className="row">
            <div className="twelve columns">
              <button onClick={this.onClickHandler}>
                Click
              </button>
            </div>
          </div>
      </div>
    );
  }
}
