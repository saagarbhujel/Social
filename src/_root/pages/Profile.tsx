import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import StatBlock from "@/components/shared/StatBlock";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetUserById } from "@/lib/react-query/queriesAndMutations";
import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { LikedPost } from ".";
import { Models } from "appwrite";

const Profile = () => {
  const { id } = useParams();
  const { user } = useUserContext();
  const { data: currentUser } = useGetUserById(id || "");
  const { pathname } = useLocation();

  if (!currentUser) {
    return (
      <div className="w-full flex-center h-full">
        <Loader />
      </div>
    );
  }

  const posts = currentUser?.posts
    .map((post: Models.Document) => ({
      ...post,
      creater: {
        imageUrl: currentUser?.imageUrl,
      },
    }))
    .reverse();
  console.log(posts);

  return (
    <div className="profile-container">
      <div className="profile-inner_containerr">
        <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
          <img
            src={
              currentUser?.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            alt="profile"
            className=" w-28 h-28 lg:w-36 lg:h-36 rounded-full"
          />
          <div>
            <div>
              <h1 className=" text-center xl:text-left h3-bold md:h1-semibold w-full first-letter:capitalize">
                {currentUser?.name}
              </h1>
              <p className="small-regular md:body-medium text-center xl:text-left text-light-3 ">
                @{currentUser?.username}
              </p>
            </div>

            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
              <StatBlock value={currentUser?.posts.length} label="Posts" />
              <StatBlock value={20} label="Followers" />
              <StatBlock value={20} label="Following" />
            </div>

            <p className=" text-center xl:text-left small-medium md:base-medium mt-7 max-w-screen-sm">
              {currentUser?.bio || "No bio yet"}
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <div>
              <Link
                to={`/update-profile/${currentUser.$id}`}
                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg  ${
                  user.id !== currentUser.$id && "hidden"
                }`}
              >
                <img
                  src="/assets/icons/edit.svg"
                  alt="Edit"
                  width={20}
                  height={20}
                />
                <p className="flex whitespace-nowrap small-medium">
                  Edit Profile
                </p>
              </Link>
            </div>

            <div className={`${user.id === id && "hidden"}`}>
              <Button type={"button"} className="shad-button_primary px-8 h-12">
                {" "}
                Follow{" "}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {currentUser.$id === user.id && (
        <div className="flex max-w-5xl w-full">
          <Link
            to={`/profile/${id}`}
            className={`profile-tab rounded-l-lg ${
              pathname === `/profile/${id}` && "!bg-darrk-3"
            }`}
          >
            <img
              src="/assets/icons/posts.svg"
              alt="posts"
              width={20}
              height={20}
            />
            Posts
          </Link>

          <Link
            to={`/profile/${id}/liked-posts`}
            className={`profile-tab rounded-r-lg ${
              pathname === `{/profile/${id}/liked-posts}` && "!bg-darrk-3"
            }`}
          >
            <img
              src="/assets/icons/like.svg"
              alt="Liked posts"
              width={20}
              height={20}
            />
            Liked Post
          </Link>
        </div>
      )}

      <Routes>
        <Route
          index
          element={<GridPostList posts={posts} showUser={false} />}
        />
        {currentUser.$id === user.id && (
          <Route path="/liked-posts" element={<LikedPost />} />
        )}
      </Routes>
      <Outlet />
    </div>
  );
};

export default Profile;
