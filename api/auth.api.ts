
import { AuthLogin, AuthRegister, AuthResponse } from "../types/Auth";
import Http from "../utils/http"
import { API, ApiResponse } from '../constants/constants';

const http = new Http(8080).getInstance();

export const login = async (auth:AuthLogin) =>{
    const response = await http.post<ApiResponse<AuthResponse>>(API.IDENTITY.LOGIN,auth);
    return response.data.result
}

export const logout = async (token:string) =>{
    const response = await http.post(API.IDENTITY.LOGOUT,{token})
    return response.data;
}
export const register = async (auth:AuthRegister) =>{
    const response = await http.post<ApiResponse<AuthResponse>>(API.IDENTITY.REGISTER,auth);
    return response.data.result
}