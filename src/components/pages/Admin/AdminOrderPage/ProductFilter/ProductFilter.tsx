import { Input } from "@heroui/react";
import ProductFilterButton from "../../../../ui/ProductFilterButton";
import { category } from "./ProductFilter.contant";
import { ChangeEvent } from "react";

interface PropTypes {
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handleClearSearch: () => void;
}

const ProductFilter = (props: PropTypes) => {
  const { handleSearch, handleClearSearch } = props;
  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="mb-5 flex w-full flex-wrap justify-start space-x-3 lg:w-2/3">
        {category.map((category, index) => (
          <ProductFilterButton key={index} category={category.category}>
            <p>{category.label}</p>
          </ProductFilterButton>
        ))}
      </div>
      <div className="w-full lg:w-1/3">
        <Input
          type="text"
          label="search product by name"
          variant="bordered"
          className="mb-6"
          onChange={handleSearch}
          isClearable
          onClear={handleClearSearch}
        />
      </div>
    </div>
  );
};

export default ProductFilter;
