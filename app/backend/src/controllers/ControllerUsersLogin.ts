import { Request, Response } from 'express';
import HttpException from '../utils/HttpException';
import LoginService from '../services/serviceLogin';

export default class LoginController {
  private loginService = new LoginService();

  async post(req: Request, res: Response) {
    const { email, password } = req.body;
    const { code, response } = await this.loginService.login(email, password);
    if (code) return res.status(code as unknown as number).json({ message: response });
    res.status(200).json(response);
  }

  async loginIsValid(req: Request, res: Response) {
    const { authorization } = req.headers;
    const { code, response } = await this.loginService
      .loginIsValid(authorization as string) as HttpException;
    if (code) return res.status(code as unknown as number).json({ message: response });
    res.status(200).json(response);
  }
}
