import { Character } from "@models/character"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import request from "superagent"
import { useMutation } from "@tanstack/react-query"

const baseUrl = new URL('/api/v1', document.baseURI)

export default function useCharacters() {

  function useGetRandomCharacters(n: number) {
    return useQuery({
      queryKey: ['characters'],
      queryFn: async () => {
        const result = await request.get(`${baseUrl}/characters/random?count=${n}`)
        return result.body as Character[]
      }
    })

  }

  function useUpdateCharacter() {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: async (updatedCharacter: Character) => {
        const res = await request.patch(`${baseUrl}/characters`).send(updatedCharacter)
        return res.body
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['characters'] })
      }
    })
  }

  return {
    getCharacters: useGetRandomCharacters,
    update: useUpdateCharacter().mutate
  }
}