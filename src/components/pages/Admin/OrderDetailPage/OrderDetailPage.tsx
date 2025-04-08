import AdminPageLayout from "../../../layouts/AdminPageLayout";
import DetailOrder from "../../../views/DetailOrder";

const OrderDetailPage = () => {
  return (
    <AdminPageLayout title="Order Detail">
      <DetailOrder />
    </AdminPageLayout>
  );
};

export default OrderDetailPage;
