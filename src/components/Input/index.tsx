import { BiSearchAlt2 } from 'react-icons/bi';
import './Input.css';

type InputProps = {
  filter: string;
  setFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ filter, setFilter }: InputProps) => {
  return (
    <div className="field">
      <BiSearchAlt2 size={24} className="search-icon" />
      <input
        value={filter}
        onChange={setFilter}
        type="text"
        placeholder="Filter by name..."
      ></input>
    </div>
  );
};

export default Input;
