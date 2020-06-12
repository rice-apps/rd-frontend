import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import Discussions from "./components/Discussions";

// TODO: find a way to fix Login being blank after error ticket
// without forcing a refresh on page navigation

function App() {
    return (
        <Router forceRefresh={true}>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/discussions">
                    <Discussions />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
