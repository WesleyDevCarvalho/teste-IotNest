import { format } from 'date-fns'
import { Match } from '../../data/@types/request/api'

interface MatchListProps {
  matches: Match[]
  selectedTeamId: number | null
}

const MatchList: React.FC<MatchListProps> = ({ matches, selectedTeamId }) => {
  return (
    <div className={`matches ${selectedTeamId ? 'single-column' : ''}`}>
      {matches.map((match) => (
        <div className='match' key={match.id}>
          <div>{format(new Date(match.utcDate), 'dd/MM/yyyy HH:mm')}</div>
          <div className='score-wrapper'>
            <span className='home-team'><img width={20} src={match.homeTeam.crest} /> {match.homeTeam.shortName}</span> <span><small>{match.score.winner === 'HOME_TEAM' ? '🏆' : ''}</small> {match.score.fullTime.home}</span> 
          </div>
          <div  className='score-wrapper'>
            <span className='away-team'><img width={20} src={match.awayTeam.crest} /> {match.awayTeam.shortName}</span> <span><small>{match.score.winner === 'AWAY_TEAM' ? '🏆' : ''}</small> {match.score.fullTime.away}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchList
