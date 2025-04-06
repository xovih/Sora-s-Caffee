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

  const catSelected = useFilterStore((state) => state.catSelected);
  const setCatSelected = useFilterStore((state) => state.setCatSelected);

  const isActive = category === catSelected;

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
      onPress={() => setCatSelected(category)}
    >
      {children}
    </Button>
  );
};

export default ProductFilterButton;
