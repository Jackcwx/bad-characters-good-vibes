import { Character } from "@models/character"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import request from "superagent"
import { useMutation } from "@tanstack/react-query"

const rootURL = '/api/v1'

export default function useCharacters() {

  function useGetRandomCharacters(n: number) {
    return useQuery({
      queryKey: ['characters'],
      queryFn: async () => {
        const result = await request.get(`${rootURL}/characters/random?count=${n}`)
        return result.body as Character[]
      }
    })

  }

  function useUpdateCharacter() {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: async (updatedCharacter: Character) => {
        const res = await request.patch(`${rootURL}/characters`).send(updatedCharacter)
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