import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();

  const savePost = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creater: {
        imageUrl: currentUser?.imageUrl,
      },
    }))
    .reverse();
  return (
    <div className="saved-container">
      <div className="flex w-full gap-2 max-w-5xl">
        <img
          src="/assets/icons/save.svg"
          alt="saved"
          width={36}
          height={36}
          className="invert-white"
        />
        <h2 className=" h3-bold md:h2-bold text-left w-full">Saved Posts</h2>
      </div>

      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="w-full flex justify-centermax-w-5xl gap-9">
          {savePost.length === 0 ? (
            <p className="text-light-4">No post Available</p>
          ) : (
            <GridPostList posts={savePost} showStats={false} />
          )}
        </ul>
      )}
    </div>
  );
};

export default Saved;
