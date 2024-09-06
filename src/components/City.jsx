// City.js
import React from 'react';

const City = ({ cities, selectedCity, onCityChange, disabled }) => {
  return (
    <div>
      <label>City:</label>
      <select value={selectedCity} onChange={(e) => onCityChange(e.target.value)} disabled={disabled}>
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
};

export default City;
