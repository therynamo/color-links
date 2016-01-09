import React from 'react';

export default class ColorButton extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.clickHandler}>
          {this.props.color}
        </button>
      </div>
    );
  }
}

ColorButton.propTypes = {
  clickHandler: React.PropTypes.func,
  color: React.PropTypes.string
};
