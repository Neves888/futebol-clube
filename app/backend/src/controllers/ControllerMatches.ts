import { Request, Response } from 'express';
// import NotFoundException from '../utils/NotFound';
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
}

// async postMatches(req: Request, res: Response) {
//   const result = req.body;
//   const { authorization } = req.headers;
//   const { code, response } = await this._matches.postMatch(result, authorization || '');
//   if (code === NotFoundException) {
//     return res.status(code as unknown as number).json({ message: response });
//   }
//   }

// async patchMatches() {

// }
