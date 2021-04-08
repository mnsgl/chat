import React from "react";
import MainPage from "./components/Pages/MainPage";
import Register from "./components/Pages/Register";
import Login from "./components/Pages/Login";
import Chat from "./components/Pages/Chats/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import "./App.css";

function App() {
  return (
    <Router>
      <GlobStyle />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/chat" component={Chat} />
      </Switch>
    </Router>
  );
}

const GlobStyle = createGlobalStyle`
  body {
		background: linear-gradient(to right, #9102b4 35%, #ec0d43);
  }
`;

export default App;
