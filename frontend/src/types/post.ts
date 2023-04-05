export interface User {
    id: number,
    username: string,
    email: string,
    is_superuser: boolean
}

export interface Comment {
    id: number,
    user: User,
    content: string,
    post: number,
    date: string
}

export interface Image {
    id: number,
    post: number,
    image: string
}

export interface Post {
    id: number,
    user: User,
    content: string,
    images: Image[],
    likes: number,
    comments: Comment[],
    date: string
}