import React from "react";
import Header from "./components/global/header/Header";
import { BrowserRouter, Route } from "react-router-dom";
import routes from "./routes/Routes";

const App: React.FC = () => {
  return (
    <div className="Reactive-Portfolio">
      <BrowserRouter>
        <Header routes={routes} />
        {routes.map(route => (
          <Route path={route.path} component={route.component} exact={route.exact} />
        ))}
      </BrowserRouter>
    </div>
  );
};

export default App;
