import { Router } from 'express';
import LeaderboardController from '../controllers/ControllerLeaderboard';

const routerLeaderboard = Router();
const leaderboard = new LeaderboardController();

// routerLeaderboard.get('/', (req, res) => leaderboard.getLeaderboard(req, res));
routerLeaderboard.get('/home', (req, res) => leaderboard.getLeaderboardHome(req, res));
// routerLeaderboard.get('/away', (req, res) => leaderboard.getLeaderboardAway(req, res));

export default routerLeaderboard;
