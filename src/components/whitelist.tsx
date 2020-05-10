import React from 'react';
import Whitelist from '../helpers/Whitelist';
import { getCurrentUrl, reloadCurrentTab } from '../helpers/chrome';

const whitelist = new Whitelist();

export default class WhitelistManager extends React.Component {
  constructor() {
    super();
    this.state = {
      whitelist: [],
      isActive: false,
      url: null,
    };

    getCurrentUrl(url => this.setState({ url }));

    this.toggleIsActive = this.toggleIsActive.bind(this);
    this.handleOnRemove = this.handleOnRemove.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentDidMount() {
    whitelist.getWhitelist()
    .then((urls) => {
      this.setState({ whitelist: urls });
      this.setState({ isActive: urls.find(url => url === this.state.url) });
    })
    .catch(err => console.log(err));
  }

  handleOnRemove() {
    this.toggleIsActive();

    whitelist.removeUrlFromWhitelist(this.state.url)
    .then(whitelistArr => this.setState({ whitelist: whitelistArr }))
    .then(reloadCurrentTab)
    .catch(err => console.log(err));
  }

  handleOnClick(e) {
    e.preventDefault();

    this.toggleIsActive();
    whitelist.addUrlToWhitelist(this.state.url)
    .then(whitelistArr => this.setState({ whitelist: whitelistArr }))
    .then(reloadCurrentTab)
    .catch(err => console.log(err));
  }

  toggleIsActive() {
    const { isActive } = this.state;
    this.setState({
      isActive: !isActive
    });
  }

  render() {
    const { isActive, url } = this.state;

    return (
      <div className="whitelist--wrapper">
        <span className="whitelist--text">
          {url}
        </span>
        <input
          onChange={(isActive) ? this.handleOnRemove : this.handleOnClick}
          className={`toggle whitelist--toggle`}id="cb4" type="checkbox"
          checked={this.state.isActive}
        />
        <label className="whitelist--toggle-label" htmlFor="cb4"></label>
      </div>
    );
  }
}
