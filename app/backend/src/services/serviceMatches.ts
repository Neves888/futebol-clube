import Teams from '../database/models/TeamsModel';
import Matches from '../database/models/MatchesModel';
import JWT from '../utils/jwt';
import Validation from './validations/matchesValidation';
// import NotFoundException from '../utils/NotFound';

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

  // async postMatches(homeTeam: number, awayTeam: number) {
  //   const { code, response } = this.validation.fields(homeTeam, awayTeam);

  //   if (code) {
  //     return { code, response };
  //   }
  //   if (code === homeTeam && code === awayTeam) {
  //     return { code: 422, response: 'It is not possible to create a match with two equal teams' };
  //   }
  //   if (code === NotFoundException) {
  //     return { code: 404, response: 'There is no team with such id!' };
  //   }
  // }
}
