import Loader from "@/components/shared/Loader";
import PostCard from "@/components/shared/PostCard";
import { useGetRecentPost } from "@/lib/react-query/queriesAndMutations"
import { Models } from "appwrite";


const Home = () => {

  const {data: posts, isPending: isPostsLoading, isError: isPostError} = useGetRecentPost();

  if(isPostError){
    return(
      <div className="flex flex-1">
      <div className="home-container">
        <p className="body-medium text-light-1">Something bad happened</p>
      </div>
      <div className="home-creators">
        <p className="body-medium text-light-1">Something bad happened</p>
      </div>
    </div>
    )
  }

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className=" h3-bold md:h2-bold text-left w-full">Feed</h2>
          {
            isPostsLoading && !posts ? (
              <Loader/>
            ) : (
              <ul className="flex flex-col flex-1 gap-9 w-full">
                {
                  posts?.documents.map((post: Models.Document)=>(
                      <li key={post.$id} 
                      className="flex justify-center w-full"
                      >
                        <PostCard post={post}/>
                      </li>
                    )
                  )
                }
              </ul>
            )
          }

        </div>

      </div>

    </div>
  )
}

export default Home