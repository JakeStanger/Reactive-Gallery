import React from "react";
import Header from "./components/header/Header";
import { BrowserRouter, Route } from "react-router-dom";
import UserService from "./services/userService/UserService";
import Login from "./components/pages/login/Login";
import IRoute from "./routes/IRoute";
import Preview from "./components/pages/preview/Preview";

interface Props {
  userService: UserService;
  routes: IRoute[];
}

const App: React.FC<Props> = ({ userService, routes }) => {
  return (
    <div className="Reactive-Portfolio">
      <BrowserRouter>
        <Header routes={routes} userService={userService} />
        {routes.map(route => (
          <Route
            key={route.name}
            path={route.path}
            component={route.component}
            exact={route.exact}
          />
        ))}
        <Route path="/preview/:filename" component={Preview} />
        <Route path="/login" render={props => <Login {...props} userService={userService} />} />
        <Route path="/signup" render={props => <Login {...props} userService={userService} signup />} />
        <Route
          path="/logout"
          render={() => {
            userService.logout();
            window.location.href = "/";
            return <span />;
          }}
        />
      </BrowserRouter>
    </div>
  );
};

export default App;
