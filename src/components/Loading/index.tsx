import { FiLoader } from 'react-icons/fi';
import './Loading.css';

const Loading = () => {
  return (
    <div className="message-loading">
      <FiLoader />
      Loading...
    </div>
  );
};

export default Loading;
