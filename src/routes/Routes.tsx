import React from "react";
import IRoute from "./IRoute";
import Contact from "../components/pages/contact/Contact";
import Pricing from "../components/pages/pricing/Pricing";

const routes: IRoute[] = [
  {
    name: "Home",
    path: "/",
    component: () => <span>Home</span>,
    exact: true
  },
  {
    name: "Contact",
    path: "/contact",
    component: Contact
  },
  {
    name: "Pricing",
    path: "/pricing",
    component: Pricing
  }
];

export default routes;