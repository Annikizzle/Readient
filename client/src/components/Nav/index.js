import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

class Nav extends Component {
  constructor() {
    super();
    this.logout = this.logout.bind(this);
  }

  logout = (event) => {
    event.preventDefault();
    console.log("Logging out");
    Axios.post("/user/logout").then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        this.props.updateUser({
          loggedIn: false,
          username: null
        });
      }
    }).catch((err) => {
      console.log("Logout error");
      console.log(err);
    })
  }
  
  render() {
    const loggedIn = this.props.loggedIn;
    console.log("navbar render, props: ");
    console.log(this.props);
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Readient</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/search">Search</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/saved">Saved</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/saved">Saved</Link>
            </li>
            {/* {loggedIn ? (
              <section className="navbar-section">
                <Link className="btn btn-danger" to="/user/logout">Logout</Link>
              </section>
            ) : (
              <React.Fragment>
                <section className="navbar-section">
                  <Link className="btn btn-danger" to="/user/signup">Signup</Link>
                </section>
                <section className="navbar-section">
                  <Link className="btn btn-danger" to="/user/signup">Login</Link>
                </section>
              </React.Fragment>
            )} */}
          </ul>
        </div>
      </nav>
    )
  }
}

export default Nav;