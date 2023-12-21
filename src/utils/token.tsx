import { IUsers } from "@/interface";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setToken = (token: string): void => {
  cookies.set("token", token, { path: "/" });
};

export const getToken = (): string | undefined => {
  return cookies.get("token");
};

export const removeToken = (): void => {
  cookies.remove("token", { path: "/" });
};

export const setRoleAdmin = (): void => {
  cookies.set("role", "admin", { path: "/" });
};

export const getRoleAdmin = (): string | undefined => {
  return cookies.get("role");
};

export const removeRoleAdmin = (): void => {
  cookies.remove("role", { path: "/" });
};

export const setUserData = (userData: IUsers): void => {
  cookies.set("user", userData, { path: "/" });
};

export const getUserData = (): IUsers => {
  return cookies.get("user");
};

export const removeUserData = (): void => {
  cookies.remove("user", { path: "/" });
};
