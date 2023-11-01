
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