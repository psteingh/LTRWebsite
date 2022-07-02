import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import Home from "./components/home.component";
import LierBoard from "./components/lierboard.component";
import Login from "./components/login.component";
import Register from "./components/register.component";

import Navbar from "./home/navbar";
import Contact from "./home/contact";

import About from "./about/about.component";
import Lies from "./lies/lies.component";

import LiesGeneral from "./liesgeneral/liesgeneral.component";
import LiesBible from "./liesbible/liesbible.component";
import LiesMedia from "./liesmedia/liesmedia.component";

import LtrLieAdd from "./vault/ltrlie-add.component";
import LtrLieList from "./vault/ltrlie-list.component";
import LtrLieUpdate from "./vault/ltrlie-update.component";

class App extends Component {
  render() {

    return (
      <div>
      <Navbar />
        
        <div className="container mt-3">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/lierboard" component={LierBoard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/contact" component={Contact} />

            <Route exact path="/about" component={About} />
            <Route exact path="/lies" component={Lies} />

            <Route exact path="/liesgeneral" component={LiesGeneral} />
            <Route exact path="/liesbible" component={LiesBible} />
            <Route exact path="/liesmedia" component={LiesMedia} />

            <Route exact path="/ltrlies" component={LtrLieList} />
            <Route exact path="/add" component={LtrLieAdd} />
            <Route path="/ltrlies/:id" component={LtrLieUpdate} />
          </Switch>
        </div>
      
      </div>
    );
  }
}

export default App;