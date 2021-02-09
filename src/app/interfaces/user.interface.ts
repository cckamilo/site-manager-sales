export type Roles = "suscriptor" | "admin";

export interface User {
    username: string;
    password: string;
}

export interface UserResponse{
    token: string;
    userId: string;
    role: Roles;
}