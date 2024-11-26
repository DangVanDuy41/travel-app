import { Paging } from "./Paging";

export interface Review {
  id: number;
  starRate: number;
  images: Image[];
  content: string;
  user: User;
}

export interface ReviewPaging {
  data: Review[];
  paging: Paging;
}

export interface PostReviewData {
  content: string;
  starRate: number;
  imageIds?: number[];
  locationId: number;
}

interface User {
  id: string;
  userName: string;
  avatar: string;
}

interface Image {
  id: number;
  url: string;
}


