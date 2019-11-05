import { RouteComponentProps } from "react-router-dom";
import IPermissionSet from "../services/userService/IPermissionSet";

interface IRoute {
  name: string;
  path: string;
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  exact?: boolean;
  permissions?: Partial<IPermissionSet>;
}

export default IRoute;