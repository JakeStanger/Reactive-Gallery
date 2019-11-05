import IRoute from "./IRoute";
import Contact from "../components/pages/contact/Contact";
import Pricing from "../components/pages/pricing/Pricing";
import Gallery from "../components/pages/gallery/Gallery";
import Upload from "../components/pages/upload/Upload";

const routes: IRoute[] = [
  {
    name: "Home",
    path: "/",
    component: Gallery,
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
  },
  {
    name: "Upload",
    path: "/upload",
    component: Upload,
    permissions: {upload: true}
  }
];

export default routes;