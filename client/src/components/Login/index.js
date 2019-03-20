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

  handleChange = (event) => {
    this.setState( {
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    Axios.post("/api/user/login", {
      username: this.state.username,
      password: this.state.password
    })
    .then((res) => {
      console.log("Login response");
      console.log(res);
      if(res.status === 200) {
        // this.props.updateUser({
        //   loggedIn: true,
        //   username: res.data.username
        // })
        this.setState({
          redirectTo: "/saved"
        });
      }
    }).catch((err) => {
      console.log("Server Login Error");
      console.log(err);
    });
  }

  render() {
    return (
      <form>
        <div className="form-group">
        <label htmlFor="loginUsername">Username</label>
        <Input type="text" 
               id="loginUsername" 
               placeholder="Enter username"
               name="username"
               value={this.state.username}
               onChange={this.handleChange}
        />
        </div>
        <div className="form-group">
          <label htmlFor="loginPassword">Password</label>
          <Input type="password" 
                 id="loginPassword" 
                 name="password"
                 value={this.state.password}
                 onChange={this.handleChange}
          />
        </div>
        <FormBtn className="btn btn-primary" onClick={this.handleSubmit}>Submit</FormBtn>
      </form>
    )
  }
}


export default Login;