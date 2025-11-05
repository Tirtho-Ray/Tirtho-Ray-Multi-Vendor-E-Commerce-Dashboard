// utils/jwt.ts
import {jwtDecode} from "jwt-decode";

export interface DecodedUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export const decodeToken = (token: string): DecodedUser | null => {
  try {
    return jwtDecode<DecodedUser>(token);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
