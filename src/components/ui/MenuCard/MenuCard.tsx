interface PropTypes {
  index: number;
  image: string;
  name: string;
  description: string;
  price: number;
}
const MenuCard = (props: PropTypes) => {
  const { index, image, name, description, price } = props;
  return (
    <div key={index} className="rounded-lg bg-white p-4 shadow-lg">
      <img
        src={image}
        alt={name}
        className="h-40 w-full rounded-md object-cover"
      />
      <h3 className="mt-2 text-xl font-bold">{name}</h3>
      <p className="text-gray-600">{description}</p>
      <p className="mt-2 font-semibold text-primary">$ {price}</p>
    </div>
  );
};

export default MenuCard;
