import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { CharacterData } from '../../models/character.ts'
import { useNavigate } from 'react-router-dom'

const rootUrl = new URL(`api/v1/characters`, document.baseURI).toString()

export default function useAddCharacter() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CharacterData) => {
      console.log('data: ', data)
      const res = await request.post(`${rootUrl}`).send(data)

      return res.body
    },
    onSuccess: async (id) => {
      queryClient.invalidateQueries({ queryKey: ['characters'] })
      navigate(`/character/${id}`)
    },
    onError: async (error) => {
      console.log('Error: ', error) // TODO: replace with generic error for users
    },
  })
}
