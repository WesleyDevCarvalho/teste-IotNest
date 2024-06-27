import axios from 'axios'
import { PromiseApiMatchesReturn, PromiseApiReturn } from '../@types/request/api'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
})

// Interceptador para adicionar o token a todas as requisições
api.interceptors.request.use((config) => {
    const token = import.meta.env.VITE_TOKEN

    if (token) {
        config.headers['X-Auth-Token'] = token
    }

    return config
}, (error) => {
    return Promise.reject(error)
})


// interceptador para registrar os erros
api.interceptors.response.use((response) => {
    return response
}, (error) => {
    return Promise.reject(error)
})

export const getCompetitions = async (): Promise<PromiseApiReturn> => {
    const response = await api.get('/',)

    return response.data
}

export const getMatches = async (competitionId: number): Promise<PromiseApiMatchesReturn> => {
    const response = await api.get(`/${competitionId}/matches`)

    return response.data
}