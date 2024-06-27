import { Match } from '../../data/@types/request/api'
import MatchList from './MatchList'

interface MatchByRound {
  [round: string]: Match[]
}

interface RoundListProps {
  matchesByRound: MatchByRound
  selectedTeamId: number | null
}

const RoundList: React.FC<RoundListProps> = ({ matchesByRound, selectedTeamId }) => {
  return (
    <div className='rounds'>
      {Object.entries(matchesByRound).map(([round, matchesForRound]) => (
        <div className='round' key={round}>
          <h2>{round}ª rodada</h2>
          <MatchList matches={matchesForRound} selectedTeamId={selectedTeamId} />
        </div>
      ))}
    </div>
  );
};

export default RoundList
