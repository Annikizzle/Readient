import React, { Component } from "react";
import Axios from "axios";
import { Input, FormBtn } from "../Form";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    }
  }

  // TODO: Validate confirm password every state change, if they match and pass length show green check
  validateForm = () => (
    this.state.email.length > 0 &&
    this.state.password.length > 7 &&
    this.state.password === this.state.confirmPassword
  );

  handleChange = (event) => {
    this.setState( {
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // if(this.validateForm()) {
    //   alert("Good job");
    // }
    // else {
    //   alert("Bad job");
    // }
    Axios.post("/api/user", {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    }).then((res) => {
      console.log(res);
      if(res.data) {
        console.log("Successful Signup");
        this.setState({
          redirectTo: "/search"
        });
      }
      else {
        console.log("Sign-up error");
      }
    }).catch((err) => {
      console.log("Sign up server error");
      console.log(err);
    });
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="inputEmail">Email Address</label>
          <Input type="email" 
                 id="inputEmail" 
                 aria-describedby="emailHelp" 
                 placeholder="Enter email"
                 name="email"
                 value={this.state.email}
                 onChange={this.handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="inputUsername">Username</label>
          <Input type="text" 
                 id="inputUsername" 
                 placeholder="Enter username"
                 name="username"
                 value={this.state.username}
                 onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword">Password</label>
          <Input type="password" 
                 id="inputPassword" 
                 aria-describedby="passwordHelp"
                 name="password"
                 value={this.state.password}
                 onChange={this.handleChange}
          />
          <small id="passwordHelp" className="form-text text-muted">Password must be at least 8 chracters</small>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <Input type="password" 
                 id="confirmPassword"
                 name="confirmPassword"
                 value={this.confirmPassword}
                 onChange={this.handleChange}
          />
        </div>
        <FormBtn className="btn btn-primary" onClick={this.handleSubmit}>Submit</FormBtn>
      </form>
    )
  }
}

export default SignUp;