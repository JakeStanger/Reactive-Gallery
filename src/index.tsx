import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import UserService from "./services/userService/UserService";
import routes from "./routes/Routes";
import IUser from "./services/userService/IUser";
import IPermissionSet from "./services/userService/IPermissionSet";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import * as config from "./config.json";

Sentry.init({
  dsn: config.sentry,
  autoSessionTracking: true,
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

const hasPermission = (
  user: IUser | null,
  permissions: Partial<IPermissionSet>
): boolean => {
  for (let permission of Object.keys(permissions) as any[]) {
    if (!user || !user.permissions[permission as keyof IPermissionSet])
      return false;
  }

  return true;
};

/**
 * Checks if the browser supports webp.
 * Official method from Google.
 * @param feature
 * @private
 */
async function checkWebpFeature(
  feature: "lossy" | "lossless" | "alpha" | "animation"
): Promise<boolean> {
  return new Promise(resolve => {
    const kTestImages = {
      lossy: "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
      lossless: "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
      alpha:
        "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
      animation:
        "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
    };
    const img = new Image();
    img.onload = function() {
      const result = img.width > 0 && img.height > 0;
      resolve(result);
    };
    img.onerror = function() {
      resolve(false);
    };
    img.src = "data:image/webp;base64," + kTestImages[feature];
  });
}

const userService = new UserService();
userService
  .init()
  .then(async () => {
    const user = await userService.getCurrentUser().catch();
    const filteredRoutes = routes.filter(
      route => !route.permissions || hasPermission(user, route.permissions)
    );

    Sentry.setUser({
      username: user?.username,
      email: user?.email
    });

    const supportsWebp = await checkWebpFeature("lossy");
    sessionStorage.setItem("supportsWebp", supportsWebp.toString());

    ReactDOM.render(
      <App userService={userService} routes={filteredRoutes} />,
      document.getElementById("root")
    );
  })
  .catch(err => {
    document.body.innerHTML = `
          <p style="padding: 10px;">An error occurred while trying to communicate with the server. 
          This is most likely due to a temporary outage. 
          Please refresh and try again.</p>
          <p style="padding: 10px;">If the issue persists please <a href="mailto:mail@jstanger.dev">let the site administrator know</a>.</p>
    `;
    throw err;
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
