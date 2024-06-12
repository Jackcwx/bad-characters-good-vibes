import { Character } from "@models/character"
import { useQueryClient } from "@tanstack/react-query"
import request from "superagent"
import { useMutation } from "@tanstack/react-query"

const rootURL = '/api/v1/characters'

export default function useCharacters() {

  function useUpdateCharacter() {
    const queryClient = useQueryClient()

    return useMutation({
      mutationFn: async (updatedCharacter: Character) => {
        const res = await request.patch(`${rootURL}`).send(updatedCharacter)
        return res.body
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['characters'] })
      }
    })
  }

  return {
    update: useUpdateCharacter().mutate
  }
}