import { Router } from 'express';

import MatchesController from '../controllers/ControllerMatches';

const routerMatches = Router();
const matches = new MatchesController();

routerMatches.get('/', (req, res) => matches.getMatches(req, res));

export default routerMatches;
