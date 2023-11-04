
export type INewUser = {
    name: string;
    username: string;
    email: string;
    password: string;
}

export type IUser ={
    id: string;
    username: string;
    email: string;
    name: string;
    imageUrl: string;
    bio: string;
}

export type INavLink ={
    imageUrl: string;
    route: string;
    label: string;
}

export type INewPost = {
    userId: string;
    caption: string;
    file: File[];
    location?: string;
    tags?: string;

}

export type IUpdatePost = {
    postId: string;
    caption: string;
    imageUrl: URL;
    imageId: string;
    file: File[];
    location?: string;
    tags?: string;
}