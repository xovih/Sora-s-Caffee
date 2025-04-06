import { Skeleton } from "@heroui/react";
import ProductCard from "../../../../ui/ProductCard";
import ProductFilter from "../ProductFilter/ProductFilter";
import useProductList from "./useProductList";
import { IMenu } from "../../../../../types/menu";

const products = [
  { name: "Raspberry Tart", price: 1, image: "/raspberry-tart.jpg" },
  { name: "Lemon Tart", price: 2, image: "/lemon-tart.jpg" },
  { name: "Chocolate Tart", price: 3, image: "/chocolate-tart.jpg" },
];

const ProductList = () => {
  const { dataProduct, isLoadingProduct } = useProductList();

  return (
    <div className="order-2 flex w-full flex-col lg:order-1 lg:w-2/3">
      <ProductFilter />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoadingProduct &&
          products.map((product, index) => (
            <Skeleton isLoaded={!isLoadingProduct}>
              {" "}
              <ProductCard key={index} {...product} id={`${index}`} />
            </Skeleton>
          ))}

        {dataProduct &&
          dataProduct.map((item: IMenu, index: number) => (
            <ProductCard
              key={index}
              id={item.id}
              image={item.image_url}
              name={item.name}
              price={item.price}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductList;
