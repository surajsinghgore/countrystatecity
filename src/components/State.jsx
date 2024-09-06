// State.js
import React from 'react';

const State = ({ states, selectedState, onStateChange, disabled }) => {
  console.log(states)
  return (
    <div>
      <label>State:</label>
      <select value={selectedState} onChange={(e) => onStateChange(e.target.value)} disabled={disabled}>
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
    </div>
  );
};

export default State;
