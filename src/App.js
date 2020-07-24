import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Feed from "./pages/PostFeedWithData";
import Home from "./pages/Home";
import MoreInfo from "./pages/MoreInfo";
import ProfilePage from "./pages/Profile.js";

// TODO: find a way to fix Login being blank after error ticket
// without forcing a refresh on page navigation

function App() {
    return (
        <Router forceRefresh={true}>
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
