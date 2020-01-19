import React from "react";

export default class CustomInput extends React.Component {
  constructor() {
    super();
    this.state = {
      color: ""
    };
  }

  componentWillMount() {
    this.setState({ color: this.props.color });
  }

  onChange(event) {
    this.setState({ color: event.target.value });
  }

  saveHandler() {
    this.props.saveHandler(this.state.color);
  }

  render() {
    return (
      <form
        className="colorLinks--custom"
        onSubmit={this.saveHandler.bind(this)}
      >
        <input
          placeholder="#ff0000"
          value={this.state.color}
          onChange={this.onChange.bind(this)}
        />
        <button onClick={this.saveHandler.bind(this)} ref="button">
          Save
        </button>
      </form>
    );
  }
}
