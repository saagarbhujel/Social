import { ID, Query } from "appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config";
import { INewPost, INewUser } from "@/types";

// ============================================================
// AUTH
// ============================================================

// ============================== SIGN UP
export const createNewUser = async (user: INewUser) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );
    if (!newAccount) throw new Error("Could not create new user");

    const avatarUrl = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      email: newAccount.email,
      name: newAccount.name,
      imageUrl: avatarUrl,
      username: user.username,
    });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// ============================== SAVE USER TO DB

export async function saveUserToDB(user: {
  accountId: string;
  email: string;
  name: string;
  imageUrl: URL;
  username?: string;
}) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );
    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// ============================== SIGN IN
export async function signInAccount(user: { email: string; password: string }) {
  try {
    const session = account.createEmailSession(user.email, user.password);
    return session;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET ACCOUNT
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET USER

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();

    if (!currentAccount) throw new Error("Could not get current user");

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw new Error("Could not get current user");
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// ============================== SIGN OUT

export const signOutAccount = async () => {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    console.log(error);
  }
};

// ============================================================
// POSTS
// ============================================================

// ============================== CREATE POST

export const createPost = async (post: INewPost) => {
  // Upload file to appwrite storage
  const uploadedFile = await uploadFile(post.file[0]);

  if (!uploadedFile) throw Error;

  // Get file url
  const fileUrl = await getFilePreview(uploadedFile.$id);

  if (!fileUrl) {
    await deleteFile(uploadedFile.$id);
    throw Error;
  }

  // Convert tags into array
  const tags = post.tags?.replace(/ /g, "").split(",") || [];

  // Create post
  const newPost = await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.postCollectionId,
    ID.unique(),
    {
      creater: post.userId,
      caption: post.caption,
      imageUrl: fileUrl,
      imageId: uploadedFile.$id,
      location: post.location,
      tags: tags,
    }
  );

  if (!newPost) {
    await deleteFile(uploadedFile.$id);
    throw Error;
  }
  return newPost;
};

// ============================== UPLOAD FILE
export const uploadFile = async (file: File) => {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
};

// ============================== GET FILE URL
export const getFilePreview = (fileId: string) => {
  try {
    const fileUrl =  storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
};

// ============================== DELETE FILE
export const deleteFile = async (fileId: string) => {
  try {
    await storage.deleteFile(appwriteConfig.storageId, fileId);
  } catch (error) {
    console.log(error);
  }
};


// ============================== GET RECENT POST
export const getRecentPost = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(20)]
    )

    if(!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
    
  }
}

// ============================== like post
export const likePost = async (postId: string, likesArray: string[]) => {
 try {
  const updatedPost = await databases.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.postCollectionId,
    postId,
    {
      likes: likesArray
    }
  )
  if(!updatedPost) throw Error;
  return updatedPost;
 } catch (error) {
  console.log(error);
  
 }
}


// ============================== SAVED POST
export const savePost = async (postId: string, userId: string) => {
  try {
    const updatePost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        users: userId, 
        post: postId
      }
    )

    if(!updatePost) throw Error;
    return updatePost;
  } catch (error) {
    console.log(error);
    
  }
}

// ============================== DELETE SAVED POST
export const deleteSavedPost = async (savedRecordId: string) => {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedRecordId,
    )
    if(!statusCode) throw Error;
    return {status: "Ok"};
  } catch (error) {
    console.log(error);
    
  }

}

// ============================== GET POST BY ID

export const getPostById = async (postId?: string) => {
  if(!postId) throw Error;

  try {
    const post = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      postId
    )
    if(!post) throw Error;
    return post;
  } catch (error) {
    console.log(error);
    
  }
}