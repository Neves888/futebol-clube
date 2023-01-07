export default class validation {
  constructor(private _regex = /^[\w]+@[\w]+.[a-z]/) { }

  public fields(email: string, password: string) {
    if (!email || !email.length || !password || password.length < 6) {
      return { code: 400, response: 'All fields must be filled' };
    }
    if (!this._regex.test(email)) {
      return { code: 401, response: 'invalid email' };
    }
    return { code: null, response: null };
  }
}
