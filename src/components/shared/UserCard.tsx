import { Models } from 'appwrite'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'


type UserCardProps = {
    users: Models.Document[] | undefined
}
const UserCard = (users: UserCardProps) => {   
  
       

  return (
    <>
   {
    users?.users?.map((item, index)=>{
        return(
            <Link to={`/profile/${item.$id}`} key={index}  className="user-card" >
            <img src={`${item.imageUrl || "/assets/icons/profile-placeholder.svg"}`}  alt="creator"
                className="rounded-full w-14 h-14" />
                <div>
                    <p className="base-medium text-light-1 text-center line-clamp-1">{item.name}</p>
                    <p className="small-regular text-light-3 text-center line-clamp-1">@{item.username}</p>
                    <Button type="button" size="sm" className="shad-button_primary px-5 mt-2">
                Follow
              </Button>
                </div>
            </Link>
        )
    })
   
}
    </>
   
  )
}

export default UserCard