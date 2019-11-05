import IRoute from "../../routes/IRoute";
import UserService from "../../services/userService/UserService";

interface IHeaderProps {
  routes: IRoute[];
  userService: UserService;
}

export default IHeaderProps;