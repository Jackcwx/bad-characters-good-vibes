import { getRandomCharacter } from '@/apis/characters'
import { useQuery } from '@tanstack/react-query'

function useRandomChararcter(count: number) {
  const query = useQuery({
    queryKey: ['randomCharacter'],
    queryFn: () => getRandomCharacter(count),
  })
  return query
}
export default useRandomChararcter
