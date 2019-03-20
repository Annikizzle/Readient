import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        {/* <Route exact path="/saved" component={Saved}></Route> */}
        {/* <Route component={NoMatch}></Route> */}
      </Switch>
    </Router>
  )
}

export default App;
