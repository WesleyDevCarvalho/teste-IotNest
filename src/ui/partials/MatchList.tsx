import { format } from 'date-fns';
import { Match } from '../../data/@types/request/api';

interface MatchListProps {
  matches: Match[];
  selectedTeamId: number | null;
}

const MatchList: React.FC<MatchListProps> = ({ matches, selectedTeamId }) => {
  return (
    <div className={`matches ${selectedTeamId ? 'single-column' : ''}`}>
      {matches.map((match) => (
        <div className='match' key={match.id}>
          <div>{format(new Date(match.utcDate), 'dd/MM/yyyy HH:mm')}</div>
          <span className='home-team'><img width={20} src={match.homeTeam.crest} /> {match.homeTeam.shortName}</span>
          <span className='away-team'><img width={20} src={match.awayTeam.crest} /> {match.awayTeam.shortName}</span>
        </div>
      ))}
    </div>
  );
};

export default MatchList;
