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
        "to-black-900 my-1 from-yellow-950 font-semibold text-black transition-colors hover:bg-gradient-to-tr hover:text-white lg:my-2",
        {
          "to-black-900 hover:to-black-500 bg-gradient-to-tr from-yellow-950 text-black hover:from-yellow-900":
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
