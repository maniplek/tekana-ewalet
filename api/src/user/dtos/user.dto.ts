export interface UserDTO {
    id?: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    trackId?: string;
}
export interface UserByEmailDTO {
    email: string;
    trackId?: string;
}

export interface UserCreateDTO {
    user: UserDTO;
    trackId?: string;
}


