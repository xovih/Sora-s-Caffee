const FooterLanding = () => {
  return (
    <>
      <section
        id="about-section"
        className="w-full max-w-5xl px-4 py-10 text-center"
      >
        <h2 className="mb-6 text-3xl font-semibold">About Us</h2>
        <p className="mx-auto max-w-3xl text-lg text-gray-600">
          Sora's Coffee is dedicated to providing the best coffee and tea
          experience. We believe in quality ingredients, exceptional service,
          and a warm atmosphere. Our ingredients are sourced from the finest
          farms to ensure quality and taste.
        </p>
      </section>
      <section
        id="contact-section"
        className="w-full bg-yellow-950/15 py-10 text-center text-black"
      >
        <h2 className="mb-6 text-3xl font-semibold">Contact Us</h2>
        <p className="text-lg">📍 123 Coffee Street, Java City</p>
        <p className="text-lg">📞 (123) 456-7890</p>
        <p className="text-lg">✉️ admin@soracoffee.shop</p>
      </section>
      <footer className="w-full bg-black py-6 text-center text-white">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Sora's Coffee. All rights reserved.
        </p>
      </footer>
    </>
  );
};

export default FooterLanding;
