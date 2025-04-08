import { Pagination, Spinner } from "@heroui/react";
import ReviewCard from "../../ui/ReviewCard";
import useReviewList from "./useReviewList";
import { IReview } from "../../../types/review";

const ReviewList = () => {
  const { page, handleChangePage, dataReviewList, isLoadingReviewList } =
    useReviewList();

  if (isLoadingReviewList)
    return (
      <div className="flex items-center justify-center gap-2">
        <Spinner color="warning" size="lg" /> <p>Loading...</p>
      </div>
    );

  return (
    <div className="flex w-full flex-col">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dataReviewList?.data.map((review: IReview) => (
          <ReviewCard
            name={`${review.reviewer_name}`}
            key={review.id}
            {...review}
          />
        ))}
      </div>
      {dataReviewList?.paging.totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center">
          <Pagination
            classNames={{
              cursor: "bg-yellow-950 text-white",
            }}
            isCompact
            showControls
            page={page}
            total={dataReviewList?.paging.totalPages ?? 1}
            onChange={handleChangePage}
            loop
          />
        </div>
      )}
    </div>
  );
};

export default ReviewList;
