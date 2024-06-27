import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { getCompetitions, getMatches } from '../services/axios'
import { Competition, Match } from '../@types/request/api'
import { AxiosError } from 'axios'
import { toast } from 'react-toastify'

interface ContextReturnProps {
  competitions: Competition[]
  selectedCompetitionId: number | null
  selectedTeamId: number | null
  isLoading: boolean
  round: number[]
  matches: Match[]
  competitionsOptions: { id: number; code: string; name: string; image: string }[]
  teamsOptions: { id: number; name: string; image: string; }[]
  roundOptions: number[]
  setRound: React.Dispatch<React.SetStateAction<number[]>>
  setSelectedTeamId: React.Dispatch<React.SetStateAction<number | null>>
  setSelectedCompetitionId: React.Dispatch<React.SetStateAction<number | null>>
}

const App = createContext<ContextReturnProps | undefined>(undefined)

export const AppContextProvider: React.FC<any> = ({ children }) => {
  const [selectedCompetitionId, setSelectedCompetitionId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null)
  const [round, setRound] = useState<number[]>([])
  const [competitions, setCompetitions] = useState<Competition[]>([])
  const [matches, setMatches] = useState<any[]>([])

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        setIsLoading(true)
        const response = await getCompetitions()

        setCompetitions(response.competitions)

      } catch (error) {
        const axiosError = error as AxiosError

        if (axiosError.response?.status === 429) {
          toast.error("Limite de chamadas excedido. Tente novamente em alguns segundos.", {
            theme: 'colored',
            autoClose: 3500,
          });
        } else {
          toast.error("Erro interno do servidor", {
            theme: 'colored',
            autoClose: 3500,
          });
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchCompetitions()
  }, [])

  useEffect(() => {
    const handleCompetitionChange = async () => {
      try {
        setIsLoading(true)
        if (selectedCompetitionId) {
          const response = await getMatches(selectedCompetitionId)
          setMatches(response.matches)
        } else {
          setMatches([]);
        }
      } catch (error: AxiosError | unknown) {
        const axiosError = error as AxiosError
        if (axiosError.response?.status === 429) {
          toast.error("Limite de chamadas excedido. Tente novamente em alguns segundos.", {
            theme: 'colored',
            autoClose: 3500,
          });
        } else {
          toast.error("Erro interno do servidor", {
            theme: 'colored',
            autoClose: 3500,
          });
        }
      } finally {
        setIsLoading(false)
      }

      setSelectedTeamId(null)
      setRound([])
    };

    handleCompetitionChange()
  }, [selectedCompetitionId])

  const competitionsOptions = useMemo(() => {
    return competitions.map((competition) => ({ id: competition.id, code: competition.code, name: competition.name, image: competition.area.flag || competition.emblem }))
  }, [competitions.length])

  const teamsOptions = useMemo(() => {
    const teamMap = new Map()
    matches.forEach(match => {
      const homeTeamId = match.homeTeam.id
      const awayTeamId = match.awayTeam.id

      if (!teamMap.has(homeTeamId)) {
        teamMap.set(homeTeamId, {
          id: homeTeamId,
          name: match.homeTeam.shortName,
          image: match.homeTeam.crest,
        });
      }

      if (!teamMap.has(awayTeamId)) {
        teamMap.set(awayTeamId, {
          id: awayTeamId,
          name: match.awayTeam.shortName,
          image: match.awayTeam.crest,
        });
      }
    });
    return [...teamMap.values()]
  }, [matches])

  const roundOptions = useMemo(() => {
    const rounds = new Set()
    matches.forEach(match => {
      const roundNumber = parseInt(match.matchday, 10) as number;
      if (!isNaN(roundNumber)) {
        rounds.add(roundNumber)
      }
    });
    return Array.from(rounds).sort((a, b) => (a as number) - (b as number)) as number[];
  }, [matches.length])

  return (
    <App.Provider value={{ competitions, matches, isLoading, selectedCompetitionId, selectedTeamId, round, competitionsOptions, teamsOptions, roundOptions, setRound, setSelectedCompetitionId, setSelectedTeamId }}>
      {children}
    </App.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(App)
  if (!context) {
    throw new Error(
      'O componente useAppContext deve ser usado dentro de um AppContextProvider',
    )
  }
  return context
}
