import { Button } from "@heroui/react";

interface PropTypes {
  label: string;
  onPress: () => void;
}

const TopNavButton = (props: PropTypes) => {
  const { label, onPress } = props;
  return (
    <Button variant="light" className="mb-2 w-full" onPress={onPress}>
      {label}
    </Button>
  );
};

export default TopNavButton;
