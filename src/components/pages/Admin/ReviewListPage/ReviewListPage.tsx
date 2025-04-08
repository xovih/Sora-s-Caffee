import AdminPageLayout from "../../../layouts/AdminPageLayout";
import ReviewList from "../../../views/ReviewList";

const ReviewListPage = () => {
  return (
    <AdminPageLayout title="Customer Reviews">
      <ReviewList />
    </AdminPageLayout>
  );
};

export default ReviewListPage;
