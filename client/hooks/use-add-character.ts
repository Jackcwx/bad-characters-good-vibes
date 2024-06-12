import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'
import { CharacterData } from '../../models/character.ts'
import { useNavigate } from 'react-router-dom'

export default function useAddCharacter() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CharacterData) => {
      console.log('data: ', data)
      const res = await request.post('/api/v1/characters').send(data)

      return res.body
    },
    onSuccess: async (id) => {
      queryClient.invalidateQueries({ queryKey: ['characters'] })
      // navigate(`/character/${id}`)
    },
    onError: async (error) => {
      console.log('ERRRRROOORRR: ', error)
    },
  })
}
