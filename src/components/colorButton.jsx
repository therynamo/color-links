import React from 'react';

export default class ColorButton extends React.Component {
  render() {
    const buttonStyle = {
      color: 'white',
      background: this.props.color
    };

    return (
      <div>
        <button className={`colorLinks--button${this.props.active ? ' active' : ''}`} onClick={this.props.clickHandler} style={buttonStyle} ref="button">
        </button>
      </div>
    );
  }
}

ColorButton.propTypes = {
  clickHandler: React.PropTypes.func,
  color: React.PropTypes.string,
  active: React.PropTypes.bool,
};
