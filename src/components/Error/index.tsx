import './Error.css';

type ErrorType = {
  message: string;
};

const Error = ({ message }: ErrorType) => {
  return <div className="message-error">Error: ${message}</div>;
};

export default Error;
