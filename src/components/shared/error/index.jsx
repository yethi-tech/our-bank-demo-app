import { FaCircleXmark } from "react-icons/fa6";

const Error = ({ message }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 error-container">
      <div className="error-icon">
        <h1 className="text-3xl text-tenjin-error">
          <FaCircleXmark />
        </h1>
      </div>
      <div className="message">
        <h2 className="text-tenjin-error font-semibold">{message}</h2>
      </div>
    </div>
  );
};

Error.propTypes = {};

export default Error;
