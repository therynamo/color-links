import React from 'react';
import Blacklist from '../helpers/Blacklist';

const blacklist = new Blacklist();
// Taken from: http://stackoverflow.com/a/3809435
const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/g;
const validInput = {
  'border': 'green 2px solid'
};
const invalidInput = {
  'border': 'red 2px solid'
};

export default class BlacklistManager extends React.Component {
  constructor() {
    super();
    this.state = {
      blacklist: [],
      isActive: false,
      url: '',
      valid: true
    };
    this.handleIsActive = this.handleIsActive.bind(this);
  }

  componentDidMount() {
    blacklist.getBlacklist()
      .then((urls) => {
        this.setState({ blacklist: urls });
      })
      .catch(err => console.log(err));
  }

  onClick(url) {
    blacklist.removeUrlFromBlacklist(url)
      .then(blacklistArr => this.setState({ blacklist: blacklistArr }))
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
    blacklist.addUrlToBlacklist(this.state.url)
      .then(blacklistArr => this.setState({ blacklist: blacklistArr }))
      .catch(err => console.log(err));
    e.preventDefault();
  }

  handleIsActive() {
    console.log('bang');
    const { isActive } = this.state;
    this.setState({
      isActive: !isActive
    });
  }

  render() {
    const { isActive } = this.state;
    const buttonMsg = isActive ? 'close' : 'advanced options';
    const containerStyles = isActive ? 'blacklist blacklist-isActive' : 'blacklist';

    return (
      <div className={containerStyles}>
        <button onClick={this.handleIsActive} className="blacklist--button">{buttonMsg}</button>
        <div className="blacklist--content">
          <form className="blacklist--form" onSubmit={this.handleSubmit.bind(this)}>
            <label className="blacklist--inputLabel">Blacklist URL</label>
            <input className="blacklist--input" style={this.state.valid ? validInput : invalidInput} type="text" placeholder="http(s)://..." onChange={this.onChange.bind(this)}/>
            <input className="blacklist--submit" disabled={!this.state.valid} type="submit" value="Add" />
          </form>
          <ul className="blacklist--list">
            {
              this.state.blacklist.map((url, i) => {
                return <li key={i} onClick={this.onClick.bind(this, url)}> {url} </li>;
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}
