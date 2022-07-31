import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
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
import Protected from "./view/Protected";

// import ProtectedRoute from "./view/ProtectedRoute";

import LieBibleList from "./liebible/liebible-list.component";
import LieBibleAdd from "./liebible/liebible-add.component";
import LieBibleUpdate from "./liebible/liebible-update.component";

const isAuthenticated = localStorage.getItem("isAuthenticated");
  console.log("ProtectedRoute.js, this:", isAuthenticated);
class App extends Component {
  render() {
    return (
      <div>
      <Navbar />
        
        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/lierboard" element={<LierBoard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/about" element={<About />} />
            <Route path="/aboutlies" element={<Lies />} />

            <Route path="/liesgeneral" element={<LiesGeneral />} />
            <Route path="/bibleboard" element={<BibleBoard />} />
            <Route path="/liesmedia" element={<LiesMedia />} />

            <Route path="/ltrlies" element={<LtrLieList />} />
            <Route path="/add" element={<LtrLieAdd />} />
            <Route path="/ltrlies/:id" element={<LtrLieUpdate />} />

            <Route path="/admin" element={
              <Protected isAuthenticated={isAuthenticated}>
                <Admin />
              </Protected> } />
            
            {/* <ProtectedRoute exact path="/admin" component={Admin} /> */}

            <Route path="/liesbible" element={<LieBibleList />} />
            <Route path="/liesbibleadd" element={<LieBibleAdd />} />
            <Route path="/liesbible/:id" element={<LieBibleUpdate />} />
          </Routes>
        </div>
      
      </div>
    );
  }
}

export default App;