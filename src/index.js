import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./containers";

import "./index.css";

document.addEventListener("DOMContentLoaded", function() {
    const root = document.getElementById("root");
    ReactDOM.render(
        <React.StrictMode>
            <Router>
                <App />
            </Router>
        </React.StrictMode>,
        root
    );
});
