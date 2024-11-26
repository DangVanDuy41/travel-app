export type ApiResponse<T> = {
    code: number,
    message: string,
    result: T
}

export enum PERMISSIONS {
    "EDIT" = "EDIT",
    "READ" = "READ",
    "OWNER" = "OWNER",
}

export const API = {
    IDENTITY: {
        LOGIN: "identity/auth/login",
        LOGOUT: "identity/auth/logout",
        REGISTER: "identity/auth/register"
    },
    PROFILE: {
        GET_PROFILE: "profile/users/my-profile"
    },
    LOCATION: {
        SEARCH_LOCATION: "location/locations",
        GET_TYPE:"location/locations/type",
        GET_LOCATION_BY_TYPE:"location/locations/location-type",
        GET_LOCATION_BY_ID:"location/locations/internal"
    },
    REVIEW: {
        POST_REVIEW: 'review/reviews',
        GET_REVIEW_BY_LOCATION: (locationId: number | undefined, page?: number) => `review/reviews/${locationId}/location?page=${page}`,
    },
    TRIP: {
        CREATE_TRIP: "trip/trips",
        GET_MY_TRIP: "trip/trips/my-trip",
        GET_ITINERARY_BY_ID:(tripId:number) =>`trip/itineraries/${tripId}/trip`,
        CREATE_DESTINATION_BY_ITINERARY:(itinerary:number) =>`trip/itineraries/${itinerary}`,
        DELETE_DESTINATION_BY_ITINERARY:(destinationId:number) =>`trip/itineraries/${destinationId}/destination`,
        GET_TRIP_PERMISSIONS:"trip/trips/permissions",
        GET_ALL_USER_IN_TRIP:(tripId:number) => `trip/trips/users/${tripId}/trip`,
        SHARE_TRIP:(tripId:number) =>`trip/trips/share/${tripId}`
    }

}
