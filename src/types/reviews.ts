// src/types/review.ts

export interface Review {
  _id: string;
  user: string; // ObjectId as string
  name: string; // user's name (populated or sent from frontend)
  rating: 1 | 2 | 3 | 4 | 5; // strictly 1–5
  comment: string;
  verified?: boolean;
  createdAt: string;
  updatedAt: string;
}

// For nested use in Product (when reviews are populated)
export interface ProductRatingSummary {
  average: number;
  count: number;
}

// Optional: For future use when you populate user details
// export interface PopulatedReview extends Review {
//   user: {
//     _id: string;
//     name: string;
//     email?: string;
//     avatar?: string;
//   };
// }
