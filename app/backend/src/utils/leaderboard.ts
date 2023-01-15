import { IHome } from './leaderboardHome';

export default (matches: IHome[]) => {
  const points = matches.reduce((acc, cur) => {
    const found = acc.find((el) => el.name === cur.name);
    if (found) {
      found.totalPoints += cur.totalPoints;
      found.totalGames += cur.totalGames;
      found.totalVictories += cur.totalVictories;
      found.totalDraws += cur.totalDraws;
      found.totalLosses += cur.totalLosses;
      found.goalsFavor += cur.goalsFavor;
      found.goalsOwn += cur.goalsOwn;
      found.goalsBalance += cur.goalsBalance;
      found.efficiency = ((found.totalPoints / (found.totalGames * 3)) * 100).toFixed(2);
    } else {
      acc.push(cur);
    }
    return acc;
  }, [] as IHome[]);
  return points;
};
