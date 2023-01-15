import { Request, Response } from 'express';
import MatchesService from '../services/serviceMatches';
import { IResponse } from '../interfaces/ILogin';

export default class MatchesController {
  private _matches = new MatchesService();

  async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (!inProgress) {
      const matches = await this._matches.getAllMatches() as unknown as IResponse;
      return res.status(200).json(matches);
    }
    const option = inProgress === 'true';
    const matches = await this._matches.getMatches(option);
    return res.status(200).json(matches);
  }

  async postMatches(req: Request, res: Response) {
    const result = req.body;
    const { code, response } = await this._matches.postMatches(result) as unknown as IResponse;
    if (code) {
      return res.status(code as number).json({ message: response });
    }
    res.status(201).json(response);
  }

  async patchMatches(req: Request, res: Response) {
    const { id } = req.params;
    const updateMatch = await this._matches.patchMatches(id);
    res.status(200).json({ message: updateMatch });
  }

  async patchIdMatches(req: Request, res: Response) {
    const { id } = req.params;
    await this._matches.patchIdMatches(id, req.body);
    res.status(200).json('');
  }
}
