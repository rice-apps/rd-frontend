import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import Other from "./components/Other";

// TODO: find a way to fix Login being blank after error ticket
// without forcing a refresh on page navigation

function App() {
    return (
        <Router forceRefresh={true}>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/other">
                    <Other />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
