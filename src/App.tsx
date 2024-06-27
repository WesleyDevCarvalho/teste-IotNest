import { filterMatchesByRound, filterMatchesByTeam, groupMatchesByRound } from './data/utils/filters'
import { Suspense, lazy } from 'react'
import { useAppContext } from './data/contexts/AppContext'
import CompetitionSelect from './ui/components/inputs/CompetitionSelect'

const Filters = lazy(() => import('./ui/partials/Filters'))
const RoundList = lazy(() => import('./ui/partials/RoundList'))

// Importação de Estilos
import './ui/styles/app/app.css'


function App() {
  const { competitions, matches, selectedTeamId, round, isLoading } = useAppContext();

  const competitionName = matches[0]?.competition.name

  const filteredMatches = filterMatchesByTeam(matches, selectedTeamId)
  const matchesByRound = groupMatchesByRound(filteredMatches)
  const filteredMatchesByRound = filterMatchesByRound(matchesByRound, round)

  return (
    <div className='container'>
      <CompetitionSelect options={competitions.map((competition) => ({ code: competition.code, name: competition.name, image: competition.emblem }))} />

      {competitionName && (
        <Suspense fallback={<div>Carregando...</div>}>
          <Filters />
        </Suspense>
      )}

      <div className='competition-name'>
        {competitionName && <h2>{isLoading ? 'Carregando...' : competitionName}</h2>}
      </div>

      {isLoading ? (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <Suspense fallback={<div>Carregando...</div>}>
          <RoundList matchesByRound={filteredMatchesByRound} selectedTeamId={selectedTeamId} />
        </Suspense>
      )}
    </div>
  );
}

export default App
