import {
  useDeleteSavePost,
  useGetCurrentUser,
  useLikePost,
  useSavedPost,
} from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};
const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavedPost();
  const { mutate: deleteSavedPost, isPending: isDeletingPost } =
    useDeleteSavePost();

  const { data: currentUser } = useGetCurrentUser();
  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

  useEffect(() => {
    //   setIsSaved(savedPostRecord ? true : false)
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = async (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes: string[] = [...likes];
    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }
    setLikes(newLikes);
    likePost({ postId: post?.$id, likesArray: newLikes });
  };

  const handleSavePost = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    } else {
      savePost({ userId: userId,postId: post?.$id || "" });
      setIsSaved(true);
    }
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-2">
        <img
          src={
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
          className="cursor-pointer"
        />
        <p className=" small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2 mr-2">
        {isSavingPost || isDeletingPost ? (
          <Loader />
        ) : (
          <img
            src={
              isSaved ? " /assets/icons/saved.svg" : "/assets/icons/save.svg"
            }
            alt="save"
            width={20}
            height={20}
            onClick={handleSavePost}
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
