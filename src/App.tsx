import React, { useState } from 'react';
import Characters from './components/Characters';
import Input from './components/Input';
import Logo from './components/Logo';
import GoogleAuth from './components/GoogleAuth';

function App() {
  const [filter, _setFilter] = useState<string>(
    sessionStorage.getItem('filter') || ''
  );
  const [page, _setPage] = useState(
    parseInt(sessionStorage.getItem('page') || '1')
  );

  const setPage = (newPage: number) => {
    _setPage(newPage);
    sessionStorage.setItem('page', JSON.stringify(newPage));
  };

  const setFilter = (newFilter: string) => {
    _setFilter(newFilter);
    sessionStorage.setItem('filter', newFilter);
  };

  const changeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setPage(1);
  };

  return (
    <div className="container">
      <GoogleAuth />
      <Logo />
      <Input setFilter={changeFilter} />
      <Characters name={filter} page={page} setPage={setPage} />
    </div>
  );
}

export default App;
