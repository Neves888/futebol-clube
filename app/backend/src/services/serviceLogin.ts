import { compareSync } from 'bcryptjs';
import JWT from '../utils/jwt';
import LoginModel from '../database/models/UsersModel';
import Validation from './validations/loginValidation';

export default class LoginService {
  private jwt = new JWT();
  private user = LoginModel;
  private validation = new Validation();

  async login(email: string, password: string) {
    const { code, response } = this.validation.fields(email, password);
    if (code) {
      return { code, response };
    }
    const isLogin = await this.user.findOne({ where: { email } });
    if (!isLogin) {
      return { code: 401, response: 'Incorrect email or password' };
    }
    if (!compareSync(password, isLogin.password)) {
      return { code: 401, response: 'Incorrect email or password' };
    }
    const { password: _, ...user } = isLogin.dataValues;
    const token = this.jwt.generationToken(user);
    return { code: null, response: { token } };
  }

  async loginIsValid(authorization: string) {
    const tokenGeneration = this.jwt.verifyToken(authorization);
    if (tokenGeneration.code) {
      return tokenGeneration;
    }
    const { email } = tokenGeneration.response;
    const isLogin = await this.user.findOne({ where: { email } });
    if (!isLogin) {
      return { code: 404, response: 'user not found' };
    }
    return { code: null, response: { role: isLogin.role } };
  }
}
