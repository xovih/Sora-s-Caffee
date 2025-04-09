import { Button, Input, Skeleton, useDisclosure } from "@heroui/react";
import LandingPageLayout from "../../layouts/LandingPageLayout";
import useHome from "./useHome";
import { menuItems } from "./Home.constants";
import { IMenu } from "../../../types/menu";
import { IReview } from "../../../types/review";
import ReviewCard from "../../ui/ReviewCard";
import ReviewModal from "../../views/ReviewModal";

const Home = () => {
  const {
    dataMenu,
    isLoadingMenu,

    dataReview,
    isLoadingReview,

    handleClearSearch,
    handleSearch,
  } = useHome();

  const reviewModal = useDisclosure();

  return (
    <LandingPageLayout>
      <main className="flex flex-col items-center px-4 py-20 text-center">
        <h1 className="mb-4 text-5xl font-bold text-yellow-950">
          Welcome to Sora's Coffee
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
              <Skeleton isLoaded={!isLoadingMenu} key={index}>
                <div key={index} className="rounded-lg bg-white p-4 shadow-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-40 w-full rounded-md object-cover"
                  />
                  <h3 className="mt-2 text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="mt-2 font-semibold text-yellow-950">
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
                <p className="mt-2 font-semibold text-yellow-950">
                  $ {item.price}
                </p>
              </div>
            ))}
        </div>
      </section>
      <section id="review-section" className="w-full max-w-5xl px-4 py-10">
        <h2 className="mb-6 text-center text-3xl font-semibold">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="col-span-1 flex flex-wrap justify-center gap-6 sm:col-span-2 md:col-span-3">
            {isLoadingReview &&
              menuItems.map((item, index) => (
                <Skeleton isLoaded={!isLoadingReview} key={index}>
                  <ReviewCard
                    name={`${item.name}`}
                    key={item.name}
                    rating={0}
                    comment={""}
                  />
                </Skeleton>
              ))}
            {dataReview &&
              dataReview.map((review: IReview) => (
                <ReviewCard
                  name={`${review.reviewer_name}`}
                  key={review.id}
                  {...review}
                />
              ))}
          </div>
          <div className="col-span-1 flex flex-wrap justify-center gap-6 sm:col-span-2 md:col-span-3">
            <Button
              size="lg"
              className="bg-yellow-950 text-white"
              type="button"
              onPress={reviewModal.onOpen}
            >
              Add Review
            </Button>
          </div>
        </div>
      </section>
      <ReviewModal {...reviewModal} />
    </LandingPageLayout>
  );
};

export default Home;
