import { API, ApiResponse } from "../constants/constants";
import { PostReviewData, Review, ReviewPaging } from "../types/Review";
import Http from "../utils/http";

const http = new Http(8086).getInstance()

export const postReview = async (postReview:PostReviewData) =>{
    const response = await http.post<ApiResponse<Review>>(API.REVIEW.POST_REVIEW,postReview);
    return response.data.result
}
export const getReviews = async (locationId:number | undefined ,page:number) =>{
    const response = await http.get<ApiResponse<ReviewPaging>>(API.REVIEW.GET_REVIEW_BY_LOCATION(locationId,page));
    return response.data.result;
    
}