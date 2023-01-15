import { IMatcherGetId } from '../interfaces/IMatches';
import { ITeams } from '../interfaces/ITeams';

export interface IAway {
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

export default (obj: IAway, team: ITeams, matches: IMatcherGetId[]) => {
  const away = { ...obj };
  matches.forEach((match) => {
    if (match.awayTeam === team.id) {
      away.name = team.teamName;
      away.totalGames += 1;
      away.goalsFavor += match.awayTeamGoals;
      away.goalsOwn += match.homeTeamGoals;
      if (match.homeTeamGoals < match.awayTeamGoals) away.totalVictories += 1;
      if (match.homeTeamGoals === match.awayTeamGoals) away.totalDraws += 1;
      if (match.homeTeamGoals > match.awayTeamGoals) away.totalLosses += 1;
      away.goalsBalance = away.goalsFavor - away.goalsOwn;
      away.totalPoints = (away.totalVictories * 3) + away.totalDraws;
      away.efficiency = ((away.totalPoints / (away.totalGames * 3)) * 100).toFixed(2);
    }
  });
  return away;
};
