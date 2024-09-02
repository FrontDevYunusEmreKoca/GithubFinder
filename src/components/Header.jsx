import React from "react";
import { Link } from "react-router-dom";
import App from "../App";

class Header extends React.Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark bg-primary">
          <div className="container">
            <Link className="navbar-brand" to="/">
              {" "}
              {/* Use the correct URL path */}
              <i className="fa-brands fa-github me-2"></i>
              Github Finder
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
export default Header;
