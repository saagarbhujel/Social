import GridPostList from '@/components/shared/GridPostList'
import Loader from '@/components/shared/Loader'
import { useGetCurrentUser } from '@/lib/react-query/queriesAndMutations'
import React from 'react'

const LikedPost = () => {
  const {data: currentUser} = useGetCurrentUser()

  if(!currentUser){
    return(
      <div className='h-full w-full flex-center'>
        <Loader />
      </div>
    )
  }
  return (
   <>
   {
    currentUser.liked.length === 0 && (
      <p className='text-light-4'>No liked post</p>
    )
   }
   <GridPostList posts={currentUser.liked} showStats={false} />
   </>
  )
}

export default LikedPost