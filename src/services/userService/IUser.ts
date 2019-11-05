import IPermissionSet from "./IPermissionSet";

interface IUser {
  username: string;
  permissions: IPermissionSet;
}

export default IUser;