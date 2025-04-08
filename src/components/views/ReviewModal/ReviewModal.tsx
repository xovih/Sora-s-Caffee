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
import { useState } from "react";
import StarSelector from "../../ui/StarSelector";

const ReviewModal = () => {
  const [rating, setRating] = useState(0);

  return (
    <Modal isOpen placement="center" scrollBehavior="inside" size="2xl">
      <form>
        <ModalContent className="p-4">
          <ModalHeader>Post a Review</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-4">
              <Input
                label="Name"
                labelPlacement="outside"
                placeholder="Your name"
                color="warning"
                size="lg"
                classNames={{
                  label: "text-black",
                }}
              />
              <div className="space-y-2">
                <label className="text-md block font-medium">Rating</label>
                <StarSelector rating={rating} setRating={setRating} />
              </div>
              <Textarea
                label="Comment"
                labelPlacement="outside"
                placeholder="type review"
                color="warning"
                size="lg"
                classNames={{
                  label: "text-black",
                }}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="bg-yellow-950/60 text-white"
              variant="flat"
              type="button"
              onPress={undefined}
              disabled={undefined}
              size="md"
            >
              Cancel
            </Button>
            <Button
              className="bg-yellow-950 text-white"
              type="submit"
              disabled={undefined}
              size="md"
            >
              {/* {undefined ? <Spinner size="sm" color="white" /> : "Login"} */}
              Review
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
};

export default ReviewModal;
