/* eslint-disable @typescript-eslint/no-explicit-any */

import Loader from './Loader'
import GridPostList from './GridPostList'

type SearchResultProps = {
  isSearchFetching: boolean,
  searchedPost: any
}

const SearchResult = ({isSearchFetching, searchedPost}: SearchResultProps) => {

  if(isSearchFetching){
    return <Loader/>
  }

  if(searchedPost && searchedPost.documents.length > 0){
    return(
      <GridPostList posts={searchedPost.documents} />
    )

  }

  return (
    <p className=' text-light-4 mt-10  text-center w-full'>No result found</p>
  )
}

export default SearchResult