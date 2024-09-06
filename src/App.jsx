// App.js
import React from 'react';
import CountryStateCity from './components/CountryStateCity';

const App = () => {
  return (
    <div>
        <h5 className='text-red-800 text-lg'>Country, State, and City Selector</h5>
      <main>
        <CountryStateCity />
      </main>
    </div>
  );
};

export default App;
