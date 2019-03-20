import React, { Component } from "react";
import SignUp from "../components/SignUp";
import Login from "../components/Login";

class Home extends Component {
  render() {
    return (
      <div className="container">
        <SignUp />
        <Login />
      </div>
    )
  }
}

export default Home;