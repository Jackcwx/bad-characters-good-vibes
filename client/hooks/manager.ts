import { MutationFunction, useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import * as API from '../apis/managers.js'
import { useAuth0 } from '@auth0/auth0-react'

export function useManagersCharacters(managerId: string) {
  const query = useQuery({
    queryKey: ['myCharacters'],
    queryFn: async () => {
      return API.getCharactersByManagerId({ managerId })
    },
  })

  return query
}

export function useManagers() {
  const { user, getAccessTokenSilently } = useAuth0()

  const query = useQuery({
    queryKey: ['manager'],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      return API.getManagers({ token })
    },
    enabled: !!user,
  })

  return {
    ...query,
    add: useAddManager(),
  }
}

export function useManagersMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['manager'] })
      queryClient.refetchQueries()
    },
  })

  return mutation
}

export function useAddManager() {
  return useManagersMutation(API.addManagers)
}
