import { Match } from "../@types/request/api";

interface MatchByRound {
  [round: string]: Match[];
}

export const filterMatchesByTeam = (matches: Match[], selectedTeamId: number | null): Match[] => {
  return selectedTeamId
    ? matches.filter(
        (match) =>
          match.homeTeam.id === selectedTeamId || match.awayTeam.id === selectedTeamId
      )
    : matches;
};

export const groupMatchesByRound = (matches: Match[]): MatchByRound => {
  return matches.reduce((acc: MatchByRound, match) => {
    const matchday = match.matchday;
    if (matchday !== null && matchday !== undefined) {
      const matchdayStr = matchday.toString();
      acc[matchdayStr] = (acc[matchdayStr] || []).concat(match);
    }
    return acc;
  }, {});
};

export const filterMatchesByRound = (matchesByRound: MatchByRound, round: number[]): MatchByRound => {
  return round.length > 0
    ? round.reduce((acc, roundNumber) => {
        const roundStr = roundNumber.toString();
        const roundMatches = matchesByRound[roundStr] || [];
        if (roundMatches.length > 0) {
          acc[roundStr] = roundMatches;
        }
        return acc;
      }, {} as MatchByRound)
    : matchesByRound;
};
