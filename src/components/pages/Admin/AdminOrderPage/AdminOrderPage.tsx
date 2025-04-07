import AdminPageLayout from "../../../layouts/AdminPageLayout";
import ProductCart from "./ProductCart/ProductCart";
import ProductList from "./ProductList/ProductList";

const AdminOrderPage = () => {
  return (
    <AdminPageLayout title="Create Order">
      {/* Cart (Mobile: Top, LG: Right) */}
      <ProductCart />

      {/* Menu List (LG: 2/3 Width) */}
      <ProductList />
    </AdminPageLayout>
  );
};

export default AdminOrderPage;
