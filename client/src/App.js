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
import Lies from "./aboutlies/lies.component";

import LiesGeneral from "./liesgeneral/liesgeneral.component";
import BibleBoard from "./boardbible/bibleboard.component";
import LiesMedia from "./liesmedia/liesmedia.component";

import LtrLieAdd from "./vault/ltrlie-add.component";
import LtrLieList from "./vault/ltrlie-list.component";
import LtrLieUpdate from "./vault/ltrlie-update.component";

import Admin from "./view/admin.component";
import ProtectedRoute from "./view/ProtectedRoute";

import LieBibleList from "./liebible/liebible-list.component";
import LieBibleAdd from "./liebible/liebible-add.component";
import LieBibleUpdate from "./liebible/liebible-update.component";

class App extends Component {
  render() {

    // const isAuthenticated = localStorage.getItem("isAuthenticated");
    // console.log("App.js isAuthenticated:", isAuthenticated);

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
            <Route exact path="/aboutlies" component={Lies} />

            <Route exact path="/liesgeneral" component={LiesGeneral} />
            <Route exact path="/bibleboard" component={BibleBoard} />
            <Route exact path="/liesmedia" component={LiesMedia} />

            <Route exact path="/ltrlies" component={LtrLieList} />
            <Route exact path="/add" component={LtrLieAdd} />
            <Route path="/ltrlies/:id" component={LtrLieUpdate} />
            
            <ProtectedRoute path="/admin" component={Admin} />
                        
            <Route exact path="/liesbible" component={LieBibleList} />
            <Route exact path="/liesbibleadd" component={LieBibleAdd} />
            <Route path="/liesbible/:id" component={LieBibleUpdate} />
          </Switch>
        </div>
      
      </div>
    );
  }
}

export default App;