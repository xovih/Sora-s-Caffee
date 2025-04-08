import { Input } from "@heroui/react";

interface PropTypes {
  label: string;
  value: string;
}

const DetailInput = (props: PropTypes) => {
  const { label, value } = props;
  return (
    <Input
      className="col-span-2"
      classNames={{
        inputWrapper: "bg-yellow-100 border-yellow-500",
        label: "text-gray-600 mb-2",
        input: "text-yellow-950 placeholder-yellow-700",
      }}
      size="lg"
      value={value}
      label={label}
    />
  );
};

export default DetailInput;
