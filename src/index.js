import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import UserProvider from "./contexts/userContext";
import Slider from "./components/Slider";

ReactDOM.render(
  <UserProvider>
    <Router>
      <App />
    </Router>
  </UserProvider>,
  document.getElementById("root")
);
