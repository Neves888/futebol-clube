import { IMatcherGetId } from '../interfaces/IMatches';
import { ITeams } from '../interfaces/ITeams';

export interface IHome {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: string;
}

export default (obj: IHome, team: ITeams, matches: IMatcherGetId[]) => {
  const home = { ...obj };
  matches.forEach((match) => {
    if (match.homeTeam === team.id) {
      home.name = team.teamName;
      home.totalGames += 1;
      home.goalsFavor += match.homeTeamGoals;
      home.goalsOwn += match.awayTeamGoals;
      if (match.homeTeamGoals > match.awayTeamGoals) home.totalVictories += 1;
      if (match.homeTeamGoals === match.awayTeamGoals) home.totalDraws += 1;
      if (match.homeTeamGoals < match.awayTeamGoals) home.totalLosses += 1;
      home.goalsBalance = home.goalsFavor - home.goalsOwn;
      home.totalPoints = (home.totalVictories * 3) + home.totalDraws;
      home.efficiency = ((home.totalPoints / (home.totalGames * 3)) * 100).toFixed(2);
    }
  });
  return home;
};
