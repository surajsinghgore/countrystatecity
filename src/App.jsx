// App.js
import React from 'react';
import CountryStateCity from './components/CountryStateCity';

const App = () => {
  return (
    <div>
      <header>
        <h1>Country, State, and City Selector</h1>
      </header>
      <main>
        <CountryStateCity />
      </main>
    </div>
  );
};

export default App;
