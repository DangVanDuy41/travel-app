import { API, ApiResponse, PERMISSIONS } from '../constants/constants';
import { Itinerary, ShareTripType, Trip, TripRequest } from "../types/Trip";
import Http from "../utils/http";


const http = new Http(8085).getInstance();

export const createTrip = async (trip: TripRequest) => {
    const response = await http.post<ApiResponse<Trip>>(API.TRIP.CREATE_TRIP, trip);
    return response.data.result;
}
export const getMyTrip = async () => {
    const response = await http.get<ApiResponse<Trip[]>>(API.TRIP.GET_MY_TRIP);
    return response.data.result;
}

export const getInineraryByTripId = async (tripId: number) => {
    const response = await http.get<ApiResponse<Itinerary[]>>(API.TRIP.GET_ITINERARY_BY_ID(tripId));
    return response.data.result;
}
export const createDestinationByItineraryId = async (locationId: number, itineraryId: number) => {
    const response = await http.post<ApiResponse<Itinerary>>(API.TRIP.CREATE_DESTINATION_BY_ITINERARY(itineraryId), { locationId });
    return response.data.result;
}
export const deleteDestination = async (destinationId: number, itineraryId: number) => {
    const response = await http.delete<ApiResponse<{}>>(API.TRIP.DELETE_DESTINATION_BY_ITINERARY(destinationId), {
        data: { itineraryId },
    })
    return response.data;
}
export const getUserInTrip = async (tripId:number) =>{
    const response = await  http.get<ApiResponse<{email:string,tripPermission:PERMISSIONS}[]>>(API.TRIP.GET_ALL_USER_IN_TRIP(tripId));
    return response.data.result;
}

export const shareTrip =async (shareTripType:ShareTripType,tripId:number) =>{
    const response = await  http.post<ApiResponse<string>>(API.TRIP.SHARE_TRIP(tripId),shareTripType);
    return response.data.result;
}