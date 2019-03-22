import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { Input, FormBtn } from "../components/Form";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      errorMsg: "",
      redirectTo: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Validate form on submit
  validateForm = () => {
    this.setState({
      errorMsg: ""
    });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email)){
      this.setState({
        errorMsg: "Email is invalid."
      });
      return false;
    }
    else if (this.state.email.length < 1 || this.state.username.length < 1) {
      this.setState({
        errorMsg: "All fields are required."
      });
      return false;
    }
    else if (this.state.password.length < 8) {
      this.setState({
        errorMsg: "Password must be at least 8 characters."
      });
      return false;
    }
    else if (this.state.password.search(/[a-z]/i) < 0) {
      this.setState({
        errorMsg: "Password must contain at least one letter."
      });
      return false;
    }
    else if (this.state.password.search(/[0-9]/) < 0) {
      this.setState({
        errorMsg: "Password must contain at least one digit."
      });
      return false;
    }
    else if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        errorMsg: "Passwords must match."
      });
      return false;
    }
    return true;
  }

  passwordsMatch = () => (
    this.state.password.length > 0 &&
    this.state.password === this.state.confirmPassword
  );

  handleChange = (event) => {
    let { name, value } = event.target;
    if (name === "username") {
      value = value.substring(0,15);
    }
    else if (name === "password") {

    }
    this.setState( {
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if(this.validateForm()) {
      Axios.post("/user", {
        email: this.state.email,
        username: this.state.username,
        password: this.state.password
      }).then((res) => {
        console.log(res);
        console.log(res.data);
        if(!res.data.error) {
          console.log("Successful Signup, Attempting Login");
          Axios.post("/user/login", {
            username: this.state.username,
            password: this.state.password
          })
          .then((res) => {
            console.log("Login response: ");
            console.log(res);
            if(res.status === 200) {
              console.log(res.data);
              this.props.updateUser({
                loggedIn: true,
                username: res.data.username
              });
              this.setState({
                redirectTo: "/"
              });
            }
          }).catch((err) => {
            console.log("Server Login Error");
            console.log(err);
          });
        }
        else {
          console.log("Sign-up error");
          this.setState({
            errorMsg: res.data.error
          });
        }
      }).catch((err) => {
        console.log("Sign up server error");
        console.log(err);
      });
    }
  }

  render() {
    if(this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }}/>
    }
    return (
      <div className="col-md-6 mx-auto my-5">
        <h2 className="text-center">Sign Up</h2>
        {this.state.errorMsg ? (
          <div className="alert alert-danger" role="alert">
            {this.state.errorMsg}
          </div>
        ) : ""}
        <form>
          <div className="form-group">
            <label htmlFor="inputEmail">Email Address</label>
            <Input type="email" 
                  id="inputEmail" 
                  placeholder="Enter email"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange}
            />
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
            <small id="passwordHelp" className="form-text text-muted">Password must be at least 8 characters</small>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Input type="password" 
                  id="confirmPassword"
                  name="confirmPassword"
                  value={this.confirmPassword}
                  onChange={this.handleChange}
            />
            {this.passwordsMatch() ? (
              <small className="form-text text-success">Passwords match</small>
            ) : ""}
          </div>
          <FormBtn className="btn btn-primary" onClick={this.handleSubmit}>Submit</FormBtn>
        </form>
      </div>
    )
  }
}

export default SignUp;