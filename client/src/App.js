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

import Admin from "./view/admin.component";
import ProtectedRoute from "./view/ProtectedRoute";

import GeneralBoard from "./boardgeneral/generalboard.component";
import BibleBoard from "./boardbible/bibleboard.component";
import MediaBoard from "./boardmedia/mediaboard.component";

import LtrLieAdd from "./vault/ltrlie-add.component";
import LtrLieList from "./vault/ltrlie-list.component";
import LtrLieUpdate from "./vault/ltrlie-update.component";

import LieBibleList from "./liebible/liebible-list.component";
import LieBibleAdd from "./liebible/liebible-add.component";
import LieBibleUpdate from "./liebible/liebible-update.component";

import LieGeneralList from "./liegeneral/liegeneral-list.component";
import LieGeneralAdd from "./liegeneral/liegeneral-add.component";
import LieGeneralUpdate from "./liegeneral/liegeneral-update.component";

import LieMediaList from "./liemedia/liemedia-list.component";
import LieMediaAdd from "./liemedia/liemedia-add.component";
import LieMediaUpdate from "./liemedia/liemedia-update.component";

class App extends Component {
  render() {

    return (
      <div>
      <Navbar />
        
        <div className="container mt-3">
          <Switch>
  
            <Route exact path="/" component={Home} />
            
            <Route exact path="/login" component={Login} />
            
            <Route exact path="/lierboard" component={LierBoard} />
            
            <Route exact path="/register" component={Register} />
            <Route exact path="/contact" component={Contact} />

            <Route exact path="/about" component={About} />
            <Route exact path="/aboutlies" component={Lies} />

            <Route exact path="/generalboard" component={GeneralBoard} />
            <Route exact path="/bibleboard" component={BibleBoard} />
            <Route exact path="/mediaboard" component={MediaBoard} />

            <Route exact path="/ltrlies" component={LtrLieList} />
            <Route exact path="/add" component={LtrLieAdd} />
            <Route path="/ltrlies/:id" component={LtrLieUpdate} />
 
            <Route exact path="/liesbible" component={LieBibleList} />
            <Route exact path="/liesbibleadd" component={LieBibleAdd} />
            <Route path="/liesbible/:id" component={LieBibleUpdate} />

            <Route exact path="/liesgeneral" component={LieGeneralList} />
            <Route exact path="/liesgeneraladd" component={LieGeneralAdd} />
            <Route path="/liesgeneral/:id" component={LieGeneralUpdate} />
            
            <Route exact path="/liesmedia" component={LieMediaList} />
            <Route exact path="/liesmediaadd" component={LieMediaAdd} />
            <Route path="/liesmedia/:id" component={LieMediaUpdate} />
            
            <ProtectedRoute exact={true} path="/" component={Admin} />
            <ProtectedRoute component={Admin} />

          </Switch>
        </div>
      
      </div>
    );
  }
}

export default App;