import React, { useState } from 'react';
import Characters from './components/Characters';
import Input from './components/Input';
import Logo from './components/Logo';

function App() {
  const [filter, setFilter] = useState<string>('');
  const [page, setPage] = useState(1);

  const changeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setPage(1);
  };

  return (
    <div className="container">
      <Logo />
      <Input setFilter={changeFilter} />
      <Characters name={filter} page={page} setPage={setPage} />
    </div>
  );
}

export default App;
