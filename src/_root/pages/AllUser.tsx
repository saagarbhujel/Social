import Loader from '@/components/shared/Loader'
import UserCard from '@/components/shared/UserCard'
import { useGetUsers } from '@/lib/react-query/queriesAndMutations'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

const AllUser = () => {

  const {ref, inView} = useInView()
  
  const {data: users, fetchNextPage, hasNextPage, isPending: isLoading} = useGetUsers()

  useEffect(()=>{
    if(inView ) fetchNextPage()
  },[inView])
  
  
  return (
    <div className='common-container'>
      <div className='user-container'>
        <h2 className='h3-bold md:h2-bold text-left w-full'>All Users</h2>
        {
          isLoading && !users ? (
            <Loader />
          ) : (
            <ul className='user-grid'>
             {
               users?.pages.map((user, index) => {
                  return(

                    <UserCard key={index} users={user?.documents} />
                   
                  )
               })
             }
            </ul>
          )
        }
      </div>
      {
        hasNextPage && (
          <div className='mt-10' ref={ref}>
            <Loader/>
          </div>
        )
      }
    </div>
  )
}

export default AllUser