import React from 'react';

export default class CustomInput extends React.Component {
  constructor() {
    super();
    this.state = {
      color: '',
    };
  }

  onChange(event) {
    this.setState({ color: event.target.value });
  }

  clickHandler() {
    this.props.clickHandler(this.state.color);
  }

  render() {
    return (
      <div className="colorLinks--custom">
        <input placeholder="#ff0000" onChange={this.onChange.bind(this)}/>
        <button onClick={this.clickHandler.bind(this)} ref="button">
          Save
        </button>
      </div>
    );
  }
}

CustomInput.propTypes = {
  clickHandler: React.PropTypes.func,
};
