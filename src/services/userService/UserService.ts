import Cookies from "js-cookie";
import IUser from "./IUser";
import React from "react";

class UserService {
  private static _instance: UserService;

  private _currentUser: IUser | null = null;

  constructor() {
    UserService._instance = this;
  }

  public static getInstance() {
    return UserService._instance;
  }

  public async init() {
    if (this.isLoggedIn()) this.getCurrentUser();
  }

  public getToken() {
    return Cookies.get("access_token");
  }

  private _setToken(token: string) {
    Cookies.set("access_token", token);
  }

  public isLoggedIn() {
    const accessToken = this.getToken();
    return (
      !!accessToken &&
      accessToken !== "undefined"
    );
  }

  public async getCurrentUser(): Promise<IUser | null> {
    const accessToken = this.getToken();

    if (!accessToken) return Promise.resolve(null);

    if (this._currentUser) return Promise.resolve(this._currentUser);

    let user = await fetch("/api/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(r => r.json());

    if (!user || user.expired) {
      this.logout();
      window.location.href = "/login";
      return null;
    }

    if (user && user.username) {
      this._currentUser = user;
      return user;
    }

    return null;
  }

  public login = async (
    ev: React.FormEvent,
    username: string,
    password: string
  ): Promise<string | null> => {
    ev.preventDefault();

    const { accessToken, message } = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(r => r.json());

    if (accessToken) this._setToken(accessToken);

    return message;
  }

  public logout() {
    Cookies.remove("access_token");
    this._currentUser = null;
  }

  public signup = async (ev: React.FormEvent, username: string, password: string): Promise<string | null> => {
    ev.preventDefault();

    const { accessToken, message } = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({username, password}),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(r => r.json());
    
    if(accessToken) this._setToken(accessToken);

    return message;
  }
}

export default UserService;
