import { Button } from "@heroui/react";
import { ShoppingCart } from "lucide-react";

const ProductCart = () => {
  return (
    <div className="order-1 min-h-[100px] w-full rounded-lg border p-4 shadow-md lg:order-2 lg:w-1/3">
      <h2 className="flex items-center gap-2 text-xl font-bold">
        <ShoppingCart /> Current Order
      </h2>
      <div className="mt-4 min-h-[50px]">
        <p className="text-gray-500">Cart is empty</p>
      </div>
      <Button
        size="lg"
        className="my-1 mt-4 flex w-full bg-yellow-950 font-semibold text-white transition-colors"
      >
        Checkout
      </Button>
    </div>
  );
};

export default ProductCart;
