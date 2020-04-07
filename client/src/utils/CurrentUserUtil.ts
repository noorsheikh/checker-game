import { CurrentUser } from '../models/CurrentUser';

class CurrentUserUtil {
  sessionStorage = window.sessionStorage;

  setCurrentUser(value: CurrentUser): void {
    this.sessionStorage.setItem('currentUser', JSON.stringify(value));
  }

  getCurrentUser(): CurrentUser {
    const userAsString = this.sessionStorage.getItem('currentUser') as string;
    return JSON.parse(userAsString);
  }

  removeCurrentUser(): void {
    this.sessionStorage.removeItem('currentUser');
  }
}

export default new CurrentUserUtil();
