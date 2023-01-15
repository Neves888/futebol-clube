import { Op } from 'sequelize';
import Teams from '../../database/models/TeamsModel';

export default class validation {
  constructor(private _teams = Teams) { }
  async fields(home: number, away: number) {
    const verify = await this._teams.findAll({ where: { [Op.or]: [
      { id: home },
      { id: away },
    ],
    } });
    if (verify.length < 1 && verify.length === 1) {
      return { code: 404, response: 'There is no team with such id' };
    }
  }
}
