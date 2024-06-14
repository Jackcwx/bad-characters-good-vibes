import { getCharacterById } from '@/apis/characters'
import { useQuery } from '@tanstack/react-query'

export function useCharacterById(id: number) {
  const query = useQuery({
    queryKey: ['characters', id],
    queryFn: () => getCharacterById(id),
  })

  return query
}
