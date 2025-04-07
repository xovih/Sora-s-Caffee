import { Button, Card, CardBody } from "@heroui/react";
import { ShoppingCart } from "lucide-react";
import useCartStore from "../../stores/CartStore";

type PropTypes = {
  name: string;
  price: number;
  image: string;
  id: string;
};

const ProductCard = (props: PropTypes) => {
  const { name, price, image, id } = props;

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <Card shadow="sm" className="">
      <CardBody>
        <img
          src={image}
          alt={name}
          className="h-28 w-full rounded-md object-cover"
        />
        <div className="mt-2 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-gray-500">${price}</p>
          </div>
          <Button
            onPress={() => {
              addToCart({
                menuItemId: id,
                quantity: 1,
                name,
              });
            }}
            className="to-black-900 my-1 bg-yellow-950 font-semibold text-white transition-colors hover:bg-yellow-700"
            isIconOnly
          >
            <ShoppingCart />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
