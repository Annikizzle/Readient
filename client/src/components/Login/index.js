import React, { Component } from "react";
import Axios from "axios";
import { Input, FormBtn } from "../Form";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    }
  }
}


export default Login;