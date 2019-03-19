import React, { Component } from "react";

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
    if(this.validateForm()) {
      alert("Good job");
    }
    else {
      alert("Bad job");
    }
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label for="inputEmail">Email Address</label>
          <input type="email" 
                 className="form-control" 
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
          <label for="inputUsername">Username</label>
          <input type="text" 
                 className="form-control" 
                 id="inputUsername" 
                 placeholder="Enter username"
                 name="username"
                 value={this.state.username}
                 onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label for="inputPassword">Password</label>
          <input type="text" 
                 className="form-control" 
                 id="inputPassword" 
                 aria-describedby="passwordHelp"
                 name="password"
                 value={this.state.password}
                 onChange={this.handleChange}
          />
          <small id="passwordHelp" className="form-text text-muted">Password must be at least 8 chracters</small>
        </div>
        <div className="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input type="text" 
                 className="form-control" 
                 id="confirmPassword"
                 name="confirmPassword"
                 value={this.confirmPassword}
                 onChange={this.handleChange}
          />
        </div>
        <button className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
      </form>
    )
  }
}

export default SignUp;