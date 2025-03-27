import { ReactNode } from "react";
import TopNavLanding from "./TopNavLanding/TopNavLanding";
import FooterLanding from "./FooterLanding";

interface PropTypes {
  children: ReactNode;
}

const LandingPageLayout = (props: PropTypes) => {
  const { children } = props;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <TopNavLanding brand="Sora's Caffee 🍵" />
      {children}
      <FooterLanding />
    </div>
  );
};

export default LandingPageLayout;
