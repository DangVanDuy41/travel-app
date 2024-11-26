import { API, ApiResponse } from "../constants/constants";
import { Profile } from "../types/Profile";
import Http from "../utils/http";

const http = new Http(8081).getInstance();

export const getProfile = async () =>{
    const reponse = await http.get<ApiResponse<Profile>>(API.PROFILE.GET_PROFILE);
    return reponse.data.result
}