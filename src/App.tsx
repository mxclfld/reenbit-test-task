import { useState } from 'react';
import Characters from './Characters';
import Input from './Input';
import Logo from './Logo';

function App() {
  const [filter, setFilter] = useState<string>('');

  return (
    <div className="container">
      <Logo />
      <Input setFilter={setFilter} />
      <Characters name={filter} />
    </div>
  );
}

export default App;
