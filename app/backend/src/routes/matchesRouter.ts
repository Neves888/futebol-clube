import { Router } from 'express';
import auth from '../middlewares/auth';
import MatchesController from '../controllers/ControllerMatches';

const routerMatches = Router();
const matches = new MatchesController();

routerMatches.get('/', (req, res) => matches.getMatches(req, res));
routerMatches.post('/', auth, (req, res) => matches.postMatches(req, res));
routerMatches.patch('/:id/finish', (req, res) => matches.patchMatches(req, res));
routerMatches.patch('/:id', (req, res) => matches.patchIdMatches(req, res));

export default routerMatches;
