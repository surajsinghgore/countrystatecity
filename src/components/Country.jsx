// Country.js
import React from 'react';

const Country = ({ countries, selectedCountry, onCountryChange }) => {
  return (
    <div>
      <label>Country:</label>
      <select value={selectedCountry} onChange={(e) => onCountryChange(e.target.value)}>
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country.isoCode} value={country.isoCode}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Country;
