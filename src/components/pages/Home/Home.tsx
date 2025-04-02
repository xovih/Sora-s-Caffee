import { Input, Skeleton } from "@heroui/react";
import LandingPageLayout from "../../layouts/LandingPageLayout";
import useHome from "./useHome";
import { menuItems } from "./Home.constants";
import { IMenu } from "../../../types/menu";

const Home = () => {
  const {
    dataMenu,
    isLoadingMenu,

    handleClearSearch,
    handleSearch,
  } = useHome();

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
            onChange={handleSearch}
            isClearable={true}
            onClear={handleClearSearch}
          />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {isLoadingMenu &&
            menuItems.map((item, index) => (
              <Skeleton isLoaded={!isLoadingMenu}>
                <div key={index} className="rounded-lg bg-white p-4 shadow-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-40 w-full rounded-md object-cover"
                  />
                  <h3 className="mt-2 text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="mt-2 font-semibold text-primary">
                    {item.price}
                  </p>
                </div>
              </Skeleton>
            ))}
          {dataMenu &&
            dataMenu.map((item: IMenu, index: number) => (
              <div key={index} className="rounded-lg bg-white p-4 shadow-lg">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="h-40 w-full rounded-md object-cover"
                />
                <h3 className="mt-2 text-xl font-bold">{item.name}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="mt-2 font-semibold text-primary">
                  $ {item.price}
                </p>
              </div>
            ))}
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default Home;
