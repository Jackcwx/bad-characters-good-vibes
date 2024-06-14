import { useQuery, QueryKey } from '@tanstack/react-query'
import request from 'superagent'

const baseUrl = new URL('/api/v1/characters/leaderboard', document.baseURI)

export default function useFetchLeaderboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: 'leaderboard' as unknown as QueryKey,
    queryFn: async () => {
      const res = await request.get(baseUrl)
      console.log(res)
      return res.body
    },
  })

  return { data, isLoading, error }
}
