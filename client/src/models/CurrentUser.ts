export interface CurrentUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  userType: string;
  token: string;
  isLoggedIn: boolean;
  iat?: number;
  exp?: number;
}
