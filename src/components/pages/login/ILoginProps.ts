import UserService from "../../../services/userService/UserService";
import { StaticContext, RouteComponentProps } from "react-router";

interface ILoginProps extends RouteComponentProps<any, StaticContext, any> {
  userService: UserService;
  signup?: boolean;
}

export default ILoginProps;