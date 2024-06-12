import { getCharacter } from '@/apis/characters'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

export function useCharacterById(id: number) {
  const query = useQuery({
    queryKey: ['characters'],
    queryFn: () => getCharacter(id),
  })
  console.log(query)
  return query
  
}
