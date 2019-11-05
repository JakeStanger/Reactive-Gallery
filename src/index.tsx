import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import UserService from "./services/userService/UserService";
import routes from "./routes/Routes";
import IUser from "./services/userService/IUser";
import IPermissionSet from "./services/userService/IPermissionSet";

const hasPermission = (user: IUser | null, permissions: Partial<IPermissionSet>): boolean => {
  for(let permission of Object.keys(permissions) as any[]) {
    if(!user || !user.permissions[permission as keyof IPermissionSet]) return false;
  }

  return true;
}

const userService = new UserService();
userService.init().then(async () => {
  const user = await userService.getCurrentUser();
  const filteredRoutes = routes.filter(
    route => !route.permissions || hasPermission(user, route.permissions)
  );

  ReactDOM.render(<App userService={userService} routes={filteredRoutes} />, document.getElementById("root"));
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
