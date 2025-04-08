import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import useToasterStore from "../../stores/ToasterStore";
import { IReview } from "../../../types/review";
import reviewService from "../../../services/review.service";

const reviewSchema = yup.object().shape({
  reviewerName: yup.string().min(3).required(),
  menuItemId: yup.string(),
  comment: yup.string().min(3).required(),
  rating: yup.number(),
});

const useReviewModal = () => {
  const setToaster = useToasterStore((state) => state.setToaster);

  const postReview = async (payload: IReview) => {
    const res = await reviewService.post(payload);

    return res.data;
  };

  const {
    control,
    handleSubmit: handleSubmitReview,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(reviewSchema),
  });

  const {
    mutate: mutateReview,
    isPending: isPendingReview,
    isSuccess: isSuccessReview,
  } = useMutation({
    mutationFn: postReview,
    onError: () => {
      setToaster({
        type: "error",
        message: "Failed to review menu.",
      });
    },
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Review created successfully.",
      });
    },
  });

  return {
    control,
    errors,
    reset,

    mutateReview,
    handleSubmitReview,
    isPendingReview,
    isSuccessReview,
  };
};

export default useReviewModal;
