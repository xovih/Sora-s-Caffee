import { Button, NavbarItem } from "@heroui/react";

interface PropTypes {
  label: string;
  onPress: () => void;
}

const TopNavItem = (props: PropTypes) => {
  const { label, onPress } = props;
  return (
    <NavbarItem>
      <Button variant="light" onPress={onPress}>
        {label}
      </Button>
    </NavbarItem>
  );
};

export default TopNavItem;
