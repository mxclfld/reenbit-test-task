import { BiSearchAlt2 } from 'react-icons/bi';
import './Input.css';

type InputProps = {
  setFilter: (filter: string) => void;
};

const Input = ({ setFilter }: InputProps) => {
  return (
    <div className="field">
      <BiSearchAlt2 size={24} className="search-icon" />
      <input
        onChange={(e) => setFilter(e.target.value)}
        type="text"
        placeholder="Filter by name..."
      ></input>
    </div>
  );
};

export default Input;
