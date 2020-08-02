import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import Feed from "./components/PostFeedWithData";
import Home from "./components/Home";
import MoreInfo from "./components/MoreInfo";
import ProfilePage from "./components/Profile.js";

// TODO: find a way to fix Login being blank after error ticket
// without forcing a refresh on page navigation

function App() {
    return (
        <Router forceRefresh>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/feed">
                    <Feed />
                </Route>
                <Route exact path="/more_info">
                    <MoreInfo />
                </Route>
                <Route exact path="/profile">
                    <ProfilePage />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
