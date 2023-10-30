import { INewUser } from '@/types'
import {useQuery,useMutation,useQueryClient,QueryClient,QueryClientProvider,} from '@tanstack/react-query'
import { createNewUser, signInAccount } from '../appwrite/api'


// ============================================================
// AUTH QUERIES
// ============================================================

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: async (user: INewUser) => createNewUser(user)
    })
} 

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: async (user: {email: string, password: string}) => signInAccount(user)
    })
}