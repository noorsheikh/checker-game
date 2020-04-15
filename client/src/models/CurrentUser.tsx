export interface CurrentUser {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  usertype: string;
  token: string;
  isLoggedIn: boolean;
  iat?: number;
  exp?: number;
}
