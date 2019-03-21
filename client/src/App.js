import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Nav from "./components/Nav";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  getUser() {
    Axios.get("/user").then((res) => {
      console.log("Get user response: ");
      console.log(res.data);
      if (res.data.user) {
        console.log("Get user: There is a user saved in the server session");
        this.setState({
          loggedIn: true,
          username: res.data.user.username
        });
      }
      else {
        console.log("Get user: No user saved in the server session");
        this.setState({
          loggedIn: false,
          username: null
        });
      }
    })
  }


  render() {
    return (
      <Router>
        <Nav username={this.state.username} 
             loggedIn={this.state.loggedIn} 
             updateUser={this.updateUser}
        />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/login" render={() => <Login updateUser={this.updateUser} getUser={this.getUser}/>}></Route>
          <Route exact path="/signup" render={() => <SignUp updateUser={this.updateUser} getUser={this.getUser}/>}></Route>
          {/* <Route exact path="/saved" component={Saved}></Route> */}
          {/* <Route component={NoMatch}></Route> */}
        </Switch>
      </Router>
    )
  }
}

export default App;
