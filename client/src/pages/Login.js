import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import { Input, FormBtn } from "../components/Form";

class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      errorMsg: "",
      redirectTo: null
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (event) => {
    this.setState( {
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      errorMsg: ""
    });
    Axios.post("/user/login", {
      username: this.state.username,
      password: this.state.password
    })
    .then((res) => {
      if(res.status === 200) {
        this.props.updateUser({
          loggedIn: true,
          username: res.data.username
        });
        this.setState({
          redirectTo: "/"
        });
      }
    }).catch((err) => {
      this.setState({
        errorMsg: "Login failed."
      });
    });
  }

  render() {
    if(this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }}/>
    }
    return (
      <div className="row">
        <div className="col-12 mx-auto my-5">
          <div className="card">
            <div className="card-header">
             <h2 className="text-center">Login</h2>
            
            </div>
            <div className="card-body">
              {this.state.errorMsg ? (
                <div className="alert alert-danger" role="alert">
                  {this.state.errorMsg}
                </div>
              ) : ""}
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
                <FormBtn className="btn btn-primary float-right" onClick={this.handleSubmit}>Submit</FormBtn>
              </form>
            
            </div>
          </div>
        </div>

      </div>
    )
  }
}


export default Login;