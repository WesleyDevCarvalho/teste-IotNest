export type Match = {
    id: number
    area: {
        id: number
        name: string
        code: string
        flag: string
    }
    competition: {
        id: number
        name: string
        code: string
        type: string
    }
    season: {
        id: number
        startDate: string
        endDate: string
        currentMatchday: number
    }
    homeTeam: {
        id: number
        name: string
        shortName: string
        tla: string
        crest: string
    }
    awayTeam: {
        id: number
        name: string
        shortName: string
        tla: string
        crest: string
    }
    utcDate: string
    status: string
    matchday: number
    stage: string
    group: string
    lastUpdated: string
    odds: {
        msg: string
    }
    score: {
        winner: string
        duration: string
        fullTime: {
            home: number
            away: number
        }
        halfTime: {
            home: number
            away: number
        }
    }
}

export type Competition = {
    id: number
    name: string
    plan: string
    type: string
    lastUpdated: string
    emblem: string
    code: string
    area: {
        id: number
        name: string
        flag: string
        code: string
    }
    currentSeason: {
        id: number
        currentMatchday: number
        startDate: string
        endDate: string
        winner: string | null
    }
}

export interface PromiseApiReturn {
    competitions: Competition[]
    count: number
    filters: {
        client: string
    }
}

export interface PromiseApiMatchesReturn {
    competition: Competition
    matches: Match[]
}