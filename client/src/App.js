import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Search from "./pages/Search";
import Saved from "./pages/Saved";
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
      if (res.data.user) {
        this.setState({
          loggedIn: true,
          username: res.data.user.username
        });
      }
      else {
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
        <div className="container">
          <Switch>
            {/* <Route exact path="/" component={Home}></Route> */}
            <Route exact path="/" render={() => <Search username={this.state.username} 
                                                              loggedIn={this.state.loggedIn} />}></Route>
            <Route exact path="/login" render={() => <Login updateUser={this.updateUser}/>}></Route>
            <Route exact path="/signup" render={() => <SignUp updateUser={this.updateUser}/>}></Route>
            <Route exact path="/saved" render={() => <Saved loggedIn={this.state.loggedIn}/>}></Route>
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
