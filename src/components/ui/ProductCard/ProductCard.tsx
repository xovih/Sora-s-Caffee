import { Button, Card, CardBody } from "@heroui/react";
import { ShoppingCart } from "lucide-react";

type PropTypes = {
  name: string;
  price: string;
  image: string;
};

const ProductCard = (props: PropTypes) => {
  const { name, price, image } = props;
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
            <p className="text-gray-500">£{price}</p>
          </div>
          <Button
            onPress={() => {}}
            className="to-black-900 my-1 bg-gradient-to-tr from-yellow-950 font-semibold text-black text-white transition-colors hover:bg-gradient-to-tr"
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
