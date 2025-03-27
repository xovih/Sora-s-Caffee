import { Input } from "@heroui/react";
import LandingPageLayout from "../../layouts/LandingPageLayout";

const Home = () => {
  const menuItems = [
    {
      name: "Espresso",
      description: "Strong and rich coffee",
      price: "$3",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Cappuccino",
      description: "Smooth and foamy",
      price: "$4",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Latte",
      description: "Creamy and delicious",
      price: "$4.5",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <LandingPageLayout>
      <main className="flex flex-col items-center px-4 py-20 text-center">
        <h1 className="mb-4 text-5xl font-bold text-primary">
          Welcome to Sora's Caffee
        </h1>
        <p className="max-w-md text-lg text-gray-600">
          Enjoy the best coffee, tea and delicious meals in a cozy environment.
        </p>
      </main>
      <section id="menu-section" className="w-full max-w-5xl px-4 py-10">
        <h2 className="mb-6 text-center text-3xl font-semibold">Our Menu</h2>
        <div className="mb-6 flex justify-center">
          <Input
            placeholder="Search menu..."
            size="lg"
            color="warning"
            className="w-full max-w-md text-lg"
          />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {menuItems.map((item, index) => (
            <div key={index} className="rounded-lg bg-white p-4 shadow-lg">
              <img
                src={item.image}
                alt={item.name}
                className="h-40 w-full rounded-md object-cover"
              />
              <h3 className="mt-2 text-xl font-bold">{item.name}</h3>
              <p className="text-gray-600">{item.description}</p>
              <p className="mt-2 font-semibold text-primary">{item.price}</p>
            </div>
          ))}
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default Home;
