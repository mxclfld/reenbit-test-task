import { BiSearchAlt2 } from 'react-icons/bi';
import './Input.css';

const Input = () => {
  return (
    <div className="field">
      <BiSearchAlt2 size={24} className="search-icon" />
      <input type="text" placeholder="Filter by name..."></input>
    </div>
  );
};

export default Input;
