import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/Login";
import Other from "./components/Other";

function App() {
    return (
        <Router>
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
