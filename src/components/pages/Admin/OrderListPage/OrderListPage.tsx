import AdminPageLayout from "../../../layouts/AdminPageLayout";
import OrderList from "../../../views/OrderList";

const OrderListPage = () => {
  return (
    <AdminPageLayout title="Order List">
      <OrderList />
    </AdminPageLayout>
  );
};

export default OrderListPage;
