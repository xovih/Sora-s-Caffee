import ProductFilterButton from "../../../../ui/ProductFilterButton";
import { category } from "./ProductFilter.contant";

const ProductFilter = () => {
  return (
    <div className="mb-5 flex flex-wrap justify-start space-x-3">
      {category.map((category, index) => (
        <ProductFilterButton key={index} category={category}>
          {category}
        </ProductFilterButton>
      ))}
    </div>
  );
};

export default ProductFilter;
