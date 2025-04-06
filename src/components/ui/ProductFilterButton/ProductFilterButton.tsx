import { Button } from "@heroui/react";
import React, { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import useFilterStore from "../../stores/FilterStore";
interface PropTypes {
  category: string;
  children: ReactNode;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const ProductFilterButton = (props: PropTypes) => {
  const { category, children, setCategory } = props;

  const isFiltered = useFilterStore((state) => state.isFiltered);
  const setIsFiltered = useFilterStore((state) => state.setIsFiltered);

  const isActive = category === isFiltered;

  const variant = isActive ? "flat" : "bordered";

  return (
    <Button
      className={cn(
        "my-1 font-semibold text-black transition-colors hover:bg-yellow-950 hover:text-white lg:my-2",
        {
          "hover:bg-black-500 hover:text-black-300 bg-yellow-950 text-white":
            isActive,
        },
      )}
      variant={variant}
      onPress={() => {
        setIsFiltered(category);
        setCategory(category);
      }}
    >
      {children}
    </Button>
  );
};

export default ProductFilterButton;
