import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { Menu as MenuIcon } from "lucide-react";
import useLandingPageMenuStore from "../../../stores/LandingPageMenuStore";
import { topNavItems } from "./TopNav.contants";
import TopNavItem from "../../../ui/TopNavItem";
import TopNavButton from "../../../ui/TopNavButton";

interface PropTypes {
  brand: string;
  onLogin: () => void;
}

const TopNavLanding = (props: PropTypes) => {
  const { brand, onLogin } = props;

  const isOpen = useLandingPageMenuStore((state) => state.isOpen);
  const setIsOpen = useLandingPageMenuStore((state) => state.setIsOpen);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar isBordered className="w-full px-6">
        <NavbarBrand>
          <span className="text-xl font-bold">{brand}</span>
        </NavbarBrand>
        <NavbarContent className="hidden md:flex">
          {topNavItems.map((item, index) => (
            <TopNavItem
              key={index}
              label={item.label}
              onPress={() => scrollToSection(item.path)}
            />
          ))}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden md:flex">
            <Button radius="none" onPress={onLogin}>
              Login
            </Button>
          </NavbarItem>
          <NavbarItem className="md:hidden">
            <Button
              isIconOnly
              variant="light"
              onPress={() => setIsOpen(!isOpen)}
            >
              <MenuIcon />
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      {isOpen && (
        // <div className="flex w-full flex-col items-center bg-white p-4 shadow-md md:hidden">
        <div className="fixed left-0 top-16 z-40 flex w-full flex-col items-center bg-white p-4 shadow-md md:hidden">
          {topNavItems.map((item, index) => (
            <TopNavButton
              key={index}
              label={item.label}
              onPress={() => {
                scrollToSection(item.path);
                setIsOpen(false);
              }}
            />
          ))}
          <Button radius="none" className="w-full" onPress={onLogin}>
            Login
          </Button>
        </div>
      )}
    </>
  );
};

export default TopNavLanding;
