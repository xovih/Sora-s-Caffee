import ProductCard from "../../../../ui/ProductCard";
import ProductFilter from "../ProductFilter/ProductFilter";

const products = [
  { name: "Raspberry Tart", price: "£8.12", image: "/raspberry-tart.jpg" },
  { name: "Lemon Tart", price: "£2.86", image: "/lemon-tart.jpg" },
  { name: "Chocolate Tart", price: "£6.12", image: "/chocolate-tart.jpg" },
  { name: "Fruit Tart", price: "£6.12", image: "/fruit-tart.jpg" },
];

const ProductList = () => {
  return (
    <div className="order-2 flex w-full flex-col lg:order-1 lg:w-2/3">
      <ProductFilter />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
