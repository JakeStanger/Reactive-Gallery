import React from "react";
import Header from "./components/header/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserService from "./services/userService/UserService";
import Login from "./components/pages/login/Login";
import IRoute from "./routes/IRoute";
import Preview from "./components/pages/preview/Preview";
import ScrollMemory from "react-router-scroll-memory";
import PageNotFound from "./components/pages/error/404";
import Profile from "./components/pages/profile/Profile";

interface Props {
  userService: UserService;
  routes: IRoute[];
}

const App: React.FC<Props> = ({ userService, routes }) => {
  return (
    <div className="Reactive-Portfolio">
      <BrowserRouter>
        <ScrollMemory />
        <Header routes={routes} userService={userService} />
        <Switch>
          {routes.map(route => (
            <Route
              key={route.name}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}
          <Route path="/preview/:filename" component={Preview} />
          {userService.isLoggedIn() && (
            <Route path="/profile" component={Profile} />
          )}
          {userService.isLoggedIn() && (
            <Route
              path="/logout"
              render={() => {
                userService.logout();
                window.location.href = "/";
                return <span />;
              }}
            />
          )}
          {!userService.isLoggedIn() && (
            <Route
              path="/login"
              render={props => <Login {...props} userService={userService} />}
            />
          )}
          {!userService.isLoggedIn() && (
            <Route
              path="/signup"
              render={props => (
                <Login {...props} userService={userService} signup />
              )}
            />
          )}
          <Route component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
