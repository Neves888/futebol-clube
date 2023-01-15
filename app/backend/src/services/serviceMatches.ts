import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
import JWT from '../utils/jwt';
import Validation from './validations/matchesValidation';
import { IMatches } from '../interfaces/IMatches';

export default class MatchesService {
  private _matches = Matches;
  private validation = new Validation();
  private jwt = new JWT();

  async getAllMatches() {
    const matches = await this._matches.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  async getMatches(progress: boolean) {
    const matches = await this._matches.findAll({
      where: { inProgress: progress },
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  private async findTeams(homeTeam: number, awayTeam: number) {
    const verifyTeamHome = await this._matches.findByPk(homeTeam);
    const verifyTeamAway = await this._matches.findByPk(awayTeam);
    if (!verifyTeamHome || !verifyTeamAway) return true;
    return false;
  }

  async postMatches(body: IMatches) {
    const { awayTeam, awayTeamGoals, homeTeam, homeTeamGoals } = body;
    if (await this.findTeams(homeTeam, awayTeam)) {
      return { code: 404, response: 'There is no team with such id!' };
    }
    if (awayTeam === homeTeam) {
      return { code: 422, response: 'It is not possible to create a match with two equal teams' };
    }
    const match = await this._matches.create({
      awayTeam,
      awayTeamGoals,
      homeTeam,
      homeTeamGoals,
      inProgress: true,
    });
    return { code: null, response: match };
  }

  async patchMatches(id: string) {
    await this._matches.update({ inProgress: false }, { where: { id } });
    return 'Finished';
  }
}
