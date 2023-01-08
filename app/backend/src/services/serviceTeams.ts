import { IResponse } from '../interfaces/ILogin';
import Teams from '../database/models/TeamsModel';

export default class TeamsService {
  private teams = Teams;

  async findAll(): Promise<IResponse> {
    const teams = await this.teams.findAll();

    return { code: null, response: teams };
  }

  async findIdTeams(id: string): Promise<IResponse> {
    const teams = await this.teams.findOne({ where: { id } });

    return { code: null, response: teams };
  }
}
