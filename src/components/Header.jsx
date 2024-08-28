import React from "react";


class Header extends React.Component {
    render(){
        return (
            <div>
                <nav className="navbar navbar-dark bg-primary">
                        <div className="container">
                            <a className="navbar-brand" href="#">
                            <i className="fa-brands fa-github me-2"></i>
                           Github Finder
                            </a>
                        </div>
                </nav>
            </div>
        )
    }
}
export default Header;