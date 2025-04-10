import { ICartItem } from "../../../types/orders";
import useCartStore from "../../stores/CartStore";
import SmallRoundedButton from "../SmallRoundedButton";

interface PropTypes {
  item: ICartItem;
}

const CartItem = (props: PropTypes) => {
  const { item } = props;

  const increase = useCartStore((state) => state.increaseQty);
  const decrease = useCartStore((state) => state.decreaseQty);
  const addNote = useCartStore((state) => state.addNote);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    addNote(`${item.menuItemId}`, e.target.value);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="font-semibold">{item.name}</span>
        <div className="flex items-center">
          <SmallRoundedButton onClick={() => increase(`${item.menuItemId}`)}>
            +
          </SmallRoundedButton>
          <span className="border-b border-t border-gray-700 px-2">
            {item.quantity}
          </span>
          <SmallRoundedButton onClick={() => decrease(`${item.menuItemId}`)}>
            -
          </SmallRoundedButton>
        </div>
      </div>
      <input
        type="text"
        name="auto-input"
        id="auto-input"
        autoComplete="off"
        value={item.notes || ""}
        onChange={handleChange}
        placeholder="Add notes"
        className="text-black-700 mt-2 w-full rounded-lg bg-gray-200 px-3 py-2 text-sm placeholder-gray-400 focus:bg-gray-300 focus:outline-none focus:ring-0"
      />
    </>
  );
};

export default CartItem;
