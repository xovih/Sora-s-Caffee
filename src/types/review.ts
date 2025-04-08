interface IReview {
  id?: string;
  menuItemId?: string;
  reviewerName?: string;
  reviewer_name?: string;
  rating: number;
  comment: string;
}

export type { IReview };
