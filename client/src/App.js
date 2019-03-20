import React from "react";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        {/* <Route exact path="/saved" component={Saved}></Route> */}
        {/* <Route component={NoMatch}></Route> */}
      </Switch>
    </Router>
  )
}

export default App;
