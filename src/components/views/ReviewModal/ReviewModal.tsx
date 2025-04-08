/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
} from "@heroui/react";
import { useEffect, useState } from "react";
import StarSelector from "../../ui/StarSelector";
import AutoCompleteInput from "../../ui/AutoCompleteInput";
import useReviewModal from "./useReviewModal";
import useAutocompleteStore from "../../stores/AutocompleteStore";
import { Controller } from "react-hook-form";
import useHome from "../../pages/Home/useHome";

interface PropTypes {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}
const ReviewModal = (props: PropTypes) => {
  const { isOpen, onOpenChange, onClose } = props;

  const [rating, setRating] = useState(0);

  const menuItemId = useAutocompleteStore((state) => state.value);

  const {
    control,
    errors,
    reset,

    mutateReview,
    handleSubmitReview,
    isPendingReview,
    isSuccessReview,
  } = useReviewModal();

  const { refetchReview } = useHome();

  const handleReview = (data: any) => {
    const payload = { ...data, rating: rating, menuItemId: menuItemId };
    mutateReview(payload);
  };

  useEffect(() => {
    reset();
    onClose();
    refetchReview();
  }, [isSuccessReview]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      scrollBehavior="inside"
      size="2xl"
    >
      <form onSubmit={handleSubmitReview(handleReview)}>
        <ModalContent className="p-4">
          <ModalHeader>Post a Review</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <Controller
                name="reviewerName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Name"
                    labelPlacement="outside"
                    placeholder="Your name"
                    color="warning"
                    size="lg"
                    classNames={{
                      label: "text-black",
                    }}
                    isInvalid={errors.reviewerName !== undefined}
                    errorMessage={errors.reviewerName?.message}
                  />
                )}
              />
              <AutoCompleteInput />
              <div className="space-y-2">
                <label className="text-md block font-medium">Rating</label>
                <StarSelector rating={rating} setRating={setRating} />
              </div>
              <Controller
                name="comment"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label="Comment"
                    labelPlacement="outside"
                    placeholder="type review"
                    color="warning"
                    size="lg"
                    classNames={{
                      label: "text-black",
                    }}
                    isInvalid={errors.comment !== undefined}
                    errorMessage={errors.comment?.message}
                  />
                )}
              />
              {errors.root !== undefined && (
                <p className="text-danger-900">{errors.root.message}</p>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="bg-yellow-950/60 text-white"
              variant="flat"
              type="button"
              onPress={() => onClose()}
              disabled={isPendingReview}
              size="md"
            >
              Cancel
            </Button>
            <Button
              className="bg-yellow-950 text-white"
              type="submit"
              disabled={isPendingReview}
              size="md"
              onPress={() => {
                handleSubmitReview(handleReview);
              }}
            >
              {isPendingReview ? <Spinner size="sm" color="white" /> : "Review"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default ReviewModal;
