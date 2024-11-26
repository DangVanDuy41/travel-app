import { API, ApiResponse } from "../constants/constants";
import { Geocoding } from "../types/Geocoding";
import { LocationType } from "../types/TypeLocation";
import Http from "../utils/http";

const http = new Http(8084).getInstance();

export const searchLocation = async (text: string) => {
    const response = await http.get<ApiResponse<Geocoding[]>>(API.LOCATION.SEARCH_LOCATION, {
        params: {
            q: text,
        }
    })
    return response.data.result;
}
export const getTypeLocation = async () => {
    const response = await http.get<ApiResponse<LocationType[]>>(API.LOCATION.GET_TYPE);
    return response.data.result
}
export const getLocationByType = async (type: string) => {
    const response = await http.get<ApiResponse<Geocoding[]>>(API.LOCATION.GET_LOCATION_BY_TYPE + `/${type}`);
    return response.data.result
}
export const getLocationById = async (id:string | string[]) =>{
    const response = await http.get<ApiResponse<Geocoding>>(API.LOCATION.GET_LOCATION_BY_ID + `/${id}`);
    return response.data.result
}