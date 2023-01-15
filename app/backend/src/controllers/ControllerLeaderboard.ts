import { Request, Response } from 'express';
import Leaderboard from '../services/serviceLeaderboard';

export default class LeaderboardController {
  private _leaderboard = new Leaderboard();

  async getLeaderboard(req: Request, res: Response) {
    const board = await this._leaderboard.getLeaderboard();
    res.status(200).json(board);
  }

  async getLeaderboardHome(req: Request, res: Response) {
    const home = await this._leaderboard.getLeaderboardHome();
    res.status(200).json(home);
  }

  async getLeaderboardAway(req: Request, res: Response) {
    const away = await this._leaderboard.getLeaderboardAway();
    res.status(200).json(away);
  }
}
