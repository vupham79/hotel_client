import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Routes } from "routes/routes";
import Spinner from "component/Spinner";
import NotFoundPage from "pages/404";

function App() {
  return (
    <>
      <BrowserRouter>
        <Spinner />
        <Switch>
          {Routes.map((route) => (
            <Route
              key={route.path}
              exact={route.exact}
              path={route.path}
              component={route.component}
            />
          ))}
          <Route path="*" exact={true} component={NotFoundPage} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
