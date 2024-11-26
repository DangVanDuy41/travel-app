export type AuthLogin = {
    email: string,
    password: string,
}

export type AuthRegister = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
    type: string;
}