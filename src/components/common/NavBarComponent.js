import React from "react";
import { Link } from "react-router-dom";
import { getNewsType } from "../../common/Utility";

export default class NavBarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newsType: getNewsType() };
  }
  setActive(type) {
    this.setState({ newsType: type });
  }
  render() {
    return (
      <div className="nav-top">
        <a className="navbar-brand" href="/">
          <img src="/img/logo.gif" className="border" alt="Logo" />
        </a>
        <Link
          to="/top"
          onClick={() => this.setActive("top")}
          className={this.state.newsType === "top" ? "item active" : "item"}
        >
          top
        </Link>
        <span> | </span>
        <Link
          to="/new"
          onClick={() => this.setActive("new")}
          className={this.state.newsType === "new" ? "item active" : "item"}
        >
          new
        </Link>
      </div>
    );
  }
}
