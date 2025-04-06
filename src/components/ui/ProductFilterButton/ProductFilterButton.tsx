import { Button } from "@heroui/react";
import { ReactNode } from "react";
import { cn } from "../../../utils/cn";
import useFilterStore from "../../stores/FilterStore";

interface PropTypes {
  category: string;
  children: ReactNode;
}

const ProductFilterButton = (props: PropTypes) => {
  const { category, children } = props;

  const isFiltered = useFilterStore((state) => state.isFiltered);
  const isActive = category === isFiltered;

  return (
    <Button
      className={cn(
        "my-1 font-semibold text-black transition-colors hover:bg-yellow-950 hover:text-white lg:my-2",
        {
          "hover:bg-black-500 hover:text-black-300 bg-yellow-950 text-white":
            isActive,
        },
      )}
      variant="bordered"
      {...props}
    >
      {children}
    </Button>
  );
};

export default ProductFilterButton;
