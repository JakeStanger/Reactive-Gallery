import IRoute from "./IRoute";
import Contact from "../pages/contact/Contact";
import Pricing from "../pages/pricing/Pricing";
import Gallery from "../pages/gallery/Gallery";
import Events from "../pages/events/Events";
import Reports from "../pages/reports/Reports";
import { lazy } from "react";

const routes: IRoute[] = [
  {
    name: "Home",
    path: "/",
    component: Gallery,
    exact: true
  },
  {
    name: "Contact & About",
    path: "/contact",
    component: Contact,
  },
  {
    name: "Pricing",
    path: "/pricing",
    component: Pricing,
  },
  {
    name: "Events",
    path: "/events",
    component: Events,
  },
  {
    name: "Upload",
    path: "/upload",
    component: lazy(() => import('../pages/upload/Upload')),
    permissions: {upload: true}
  },
  {
    name: "Reports",
    path: "/reports",
    component: Reports,
    permissions: {edit: true}
  }
];

export default routes;
