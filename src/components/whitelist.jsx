import React from 'react';
import Whitelist from '../helpers/Whitelist';

const whitelist = new Whitelist();
// Taken from: http://stackoverflow.com/a/3809435
const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/g;
const validInput = {
  'border': 'green 2px solid'
};
const invalidInput = {
  'border': 'red 2px solid'
};

export default class WhitelistManager extends React.Component {
  constructor() {
    super();
    this.state = {
      whitelist: [],
      isActive: false,
      url: '',
      valid: true
    };
    this.handleIsActive = this.handleIsActive.bind(this);
  }

  componentDidMount() {
    whitelist.getWhitelist()
      .then((urls) => {
        this.setState({ whitelist: urls });
      })
      .catch(err => console.log(err));
  }

  onClick(url) {
    whitelist.removeUrlFromWhitelist(url)
      .then(whitelistArr => this.setState({ whitelist: whitelistArr }))
      .catch(err => console.log(err));
  }

  onChange(e) {
    const input = e.target.value;
    if (this.verifyInput(input)) {
      this.setState({ url: input, valid: true });
    } else {
      this.setState({ valid: false });
    }
  }

  verifyInput(input) {
    if (urlRegex.test(input)) {
      return input;
    }
  }

  handleSubmit(e) {
    whitelist.addUrlToWhitelist(this.state.url)
      .then(whitelistArr => this.setState({ whitelist: whitelistArr }))
      .catch(err => console.log(err));
    e.preventDefault();
  }

  handleIsActive() {
    const { isActive } = this.state;
    this.setState({
      isActive: !isActive
    });
  }

  render() {
    const { isActive } = this.state;
    const buttonMsg = isActive ? 'close' : 'advanced options';
    const containerStyles = isActive ? 'whitelist whitelist-isActive' : 'whitelist';

    return (
      <div className={containerStyles}>
        <button onClick={this.handleIsActive} className="whitelist--button">{buttonMsg}</button>
        <div className="whitelist--content">
          <form className="whitelist--form" onSubmit={this.handleSubmit.bind(this)}>
            <label className="whitelist--inputLabel">Whitelist URL</label>
            <input className="whitelist--input" style={this.state.valid ? validInput : invalidInput} type="text" placeholder="http(s)://..." onChange={this.onChange.bind(this)}/>
            <input className="whitelist--submit" disabled={!this.state.valid} type="submit" value="Add" />
          </form>
          <ul className="whitelist--list">
            {
              this.state.whitelist.map((url, i) => {
                return <li key={i} onClick={this.onClick.bind(this, url)}> {url} </li>;
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}
