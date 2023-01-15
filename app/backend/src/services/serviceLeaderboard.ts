import TeamsService from './serviceTeams';
import MatchesService from './serviceMatches';
import leaderboardHome, { IHome } from '../utils/leaderboardHome';

export default class LeaderboardService {
  private _teams = new TeamsService();
  private _matches = new MatchesService();
  private _obj: IHome = {
    name: '',
    efficiency: '',
    goalsBalance: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    totalDraws: 0,
    totalGames: 0,
    totalLosses: 0,
    totalPoints: 0,
    totalVictories: 0,
  };

  private static options = (board: IHome[]): IHome[] => (
    board.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
      if (a.goalsOwn !== b.goalsOwn) return a.goalsOwn - b.goalsOwn;
      return 1;
    }));

  // async getLeaderboard(req: Request, res: Response) {

  // }

  async getLeaderboardHome() {
    const teams = await this._teams.allTeams();
    const matches = await this._matches.getMatches(false);

    if (teams && matches) {
      const result = await Promise.all(teams.map((team) =>
        leaderboardHome(this._obj, team, matches)));
      return LeaderboardService.options(result);
    }
  }
  // async getLeaderboardAway(req: Request, res: Response) {

  // }
}
