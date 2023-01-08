import { Request, Response } from 'express';
import TeamsService from '../services/serviceTeams';

export default class TeamsController {
  private teamsService = new TeamsService();

  async findAll(_req: Request, res: Response) {
    const { code, response } = await this.teamsService.findAll();
    if (code) return res.status(code as number).json({ response });
    res.status(200).json(response);
  }

  async findIdTeams(req: Request, res: Response) {
    const { id } = req.params;
    const { code, response } = await this.teamsService.findIdTeams(id);
    if (code) return res.status(code as number).json({ response });
    res.status(200).json(response);
  }
}
