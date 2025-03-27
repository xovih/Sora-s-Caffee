import { ReactNode } from "react";
import { CircleCheck, CircleX } from "lucide-react";

const iconList: { [key: string]: ReactNode } = {
  success: <CircleCheck className="text-3xl text-success-500" />,
  error: <CircleX className="text-3xl text-danger-500" />,
};

interface PropTypes {
  type: string;
  message: string;
}

const Toaster = (props: PropTypes) => {
  const { type, message } = props;

  return (
    <div
      role="alert"
      aria-labelby="toaster-label"
      className="max-w-s fixed right-8 top-8 z-50 rounded-xl border border-gray-300 bg-white shadow-md"
    >
      <div className="flex items-center gap-2 p-4">
        {iconList[type]}
        <p id="toaster-label" className="text-sm text-gray-700">
          {message}
        </p>
      </div>
    </div>
  );
};

export default Toaster;
