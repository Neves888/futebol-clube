import { Router } from 'express';
import LoginController from '../controllers/ControllerUsersLogin';

const routerUser = Router();

const user = new LoginController();

routerUser.post('/', (req, res) => user.post(req, res));
routerUser.get('/validate', (req, res) => user.loginIsValid(req, res));

export default routerUser;
