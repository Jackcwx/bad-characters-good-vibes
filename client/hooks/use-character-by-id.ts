import { getCharacterById } from '@/apis/characters'
import { useQuery } from '@tanstack/react-query'

export function useCharacterById(id: number) {
  const query = useQuery({
    queryKey: ['characters'],
    queryFn: () => getCharacterById(id),
  })
  console.log(query)
  return query
}
