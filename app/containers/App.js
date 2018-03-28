import React from "react";
import Switch from "react-router-dom/Switch";
import BrowserRouter from "react-router-dom/BrowserRouter";
import Route from "react-router-dom/Route";
import Link from "react-router-dom/Link";
import Home from "./Home";
import About from "./About";

import "../style.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: "testtttt"
    };
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>

          <hr />
          <Switch>
            <Route exact path="/" name="Home" component={Home} />
            <Route path="/about" name="About" component={About} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
