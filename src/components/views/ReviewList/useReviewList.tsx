import { useState } from "react";
import reviewService from "../../../services/review.service";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "react-router-dom";

const useReviewList = () => {
  const navigation = useNavigation();
  const isReady = navigation.state === "idle";

  const [page, setPage] = useState<number>(1);
  const handleChangePage = (p: number) => setPage(p);

  const getReviews = async () => {
    const params = `pageSize=8&page=${page}`;
    const res = await reviewService.list(params);

    return {
      data: res.data.data,
      paging: res.data.metadata,
    };
  };

  const { data: dataReviewList, isPending: isLoadingReviewList } = useQuery({
    queryKey: ["ReviewList", page],
    queryFn: getReviews,
    enabled: isReady && !!page,
  });

  return { page, handleChangePage, dataReviewList, isLoadingReviewList };
};

export default useReviewList;
