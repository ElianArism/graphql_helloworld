export interface Response {
    status: boolean; 
    message: string;
}

export type GetResult<T> = Response & {data?: T};
export type UserResponse<T> = Response & {user?: T};