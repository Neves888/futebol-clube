import { Router } from 'express';
import TeamsController from '../controllers/ControllerTeams';

const teamsRouter = Router();

const teamsController = new TeamsController();

teamsRouter.get('/', (req, res) => teamsController.findAll(req, res));
teamsRouter.get('/:id', (req, res) => teamsController.findIdTeams(req, res));

export default teamsRouter;
