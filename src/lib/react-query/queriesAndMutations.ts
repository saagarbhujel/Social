import { INewPost, INewUser } from '@/types'
import {useQuery,useMutation,useQueryClient,QueryClient,QueryClientProvider,} from '@tanstack/react-query'
import { createNewUser, createPost, getRecentPost, signInAccount, signOutAccount } from '../appwrite/api'
import { QUERY_KEYS } from './QueryKeys'



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

//Signout
export const useSignOutAccount = () => {
    return useMutation({
        mutationFn:  signOutAccount
        
    })
}

//create post 
export const useCreatePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (post: INewPost) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [QUERY_KEYS.GET_RECENT_POST],
            })
        }
    })
}

export const useGetRecentPost = () => {
    return useQuery({
        queryKey: [QUERY_KEYS.GET_RECENT_POST],
        queryFn: getRecentPost
    })
}