import { ReactNode } from "react";

interface PropTypes {
  children: ReactNode;
  onClick: () => void;
}
const SmallRoundedButton = (props: PropTypes) => {
  const { children, onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className="py rounded border border-gray-700 bg-gray-300 px-2"
    >
      {children}
    </button>
  );
};

export default SmallRoundedButton;
