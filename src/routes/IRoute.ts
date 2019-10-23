import { RouteComponentProps } from "react-router-dom";

interface IRoute {
  name: string;
  path: string;
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  exact?: boolean;
}

export default IRoute;