import { Request, Response } from 'express';
import MatchesService from '../services/serviceMatches';

export default class MatchesController {
  private _matches = new MatchesService();

  async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress === 'true' || inProgress === 'false') {
      const option = JSON.parse(inProgress.toLowerCase());
      const response = await this._matches.getMatches(option);
      return res.status(200).json(response);
    }
    const response = await this._matches.getAllMatches();
    return res.status(200).json(response);
  }
}
