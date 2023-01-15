export interface IMatchesGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatches extends IMatchesGoals {
  homeTeam: number;
  awayTeam: number;
}
