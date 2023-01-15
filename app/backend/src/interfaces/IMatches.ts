export interface IMatchesGoals {
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface IMatches extends IMatchesGoals {
  homeTeam: number;
  awayTeam: number;
}

export interface IMatcherGetId extends IMatches {
  id?: number;
  inProgress: boolean;
}
