import IPermissionSet from "./IPermissionSet";

interface IUser {
  username: string;
  email: string;
  permissions: IPermissionSet;
}

export default IUser;
