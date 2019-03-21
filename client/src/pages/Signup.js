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
      redirectTo: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
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
        // TODO DISPLAY SIGNUP ERROR AS MESSAGE ON PAGE 
        console.log("Sign-up error");
      }
    }).catch((err) => {
      console.log("Sign up server error");
      console.log(err);
    });
  }

  render() {
    if(this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }}/>
    }
    return (
      <div className="col-md-6 mx-auto my-5">
        <h2 className="text-center">Sign Up</h2>
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
          </div>
          <FormBtn className="btn btn-primary" onClick={this.handleSubmit}>Submit</FormBtn>
        </form>
      </div>
    )
  }
}

export default SignUp;