import React, { Suspense } from "react";
import Header from "./components/header/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserService from "./services/userService/UserService";
import Login from "./pages/login/Login";
import IRoute from "./routes/IRoute";
import Preview from "./pages/preview/Preview";
import ScrollMemory from "react-router-scroll-memory";
import PageNotFound from "./pages/error/404";
import Basket from "./pages/basket/Basket";
import Success from "./pages/checkout/Success";
import Loader from "./components/loader/Loader";

interface Props {
  userService: UserService;
  routes: IRoute[];
}

const App: React.FC<Props> = ({ userService, routes }) => {
  const isLoggedIn = userService.isLoggedIn();
  return (
    <div className="Reactive-Portfolio">
      <BrowserRouter>
        <ScrollMemory />
        <Header routes={routes} userService={userService} />
        <Suspense fallback={<Loader />}>
          <Switch>
            {routes.map(route => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
            <Route path="/preview/:filename" component={Preview} />
            {isLoggedIn ? (
              <>
                <Route path="/basket" component={Basket} />
                <Route path="/checkout" component={Success} />
                <Route
                  path="/logout"
                  component={() => {
                    userService.logout();
                    window.location.href = "/"; // Force refresh
                    return <span>You are now logged out</span>;
                  }}
                />
              </>
            ) : (
              <>
                <Route
                  path="/login"
                  render={props => (
                    <Login {...props} userService={userService} />
                  )}
                />
                <Route
                  path="/signup"
                  render={props => (
                    <Login {...props} userService={userService} signup />
                  )}
                />
              </>
            )}
            <Route component={PageNotFound} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
