// CountryStateCity.js
import React, { useState, useEffect } from "react";
import Country from "./Country";
import State from "./State";
import City from "./City";

const CountryStateCity = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [fullCountryData, setFullCountryData] = useState(null);
  const [fullStateData, setFullStateData] = useState(null);
  const [fullCityData, setFullCityData] = useState(null);

  // State code mapping
  const [stateCodeMap, setStateCodeMap] = useState({});

  useEffect(() => {
    // Fetch countries data
    fetch("/countries.json")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      // Fetch states data based on the selected country
      fetch("/states.json")
        .then((response) => response.json())
        .then((data) => {
          const filteredStates = data.filter((state) => state.countryCode === selectedCountry);
          setStates(filteredStates);

          // Create a mapping from state names to state codes
          const newStateCodeMap = {};
          filteredStates.forEach((state) => {
            newStateCodeMap[state.name] = state.isoCode;
          });
          setStateCodeMap(newStateCodeMap);

          // Set full country data
          const countryData = countries.find((country) => country.isoCode === selectedCountry);
          setFullCountryData(countryData);
        });
    }
  }, [selectedCountry, countries]);

  useEffect(() => {
    if (selectedState) {
      // Fetch cities data based on the selected state name and country
      fetch("/cities.json")
        .then((response) => response.json())
        .then((data) => {
          const filteredCities = data.filter((city) => {
            const stateCode = stateCodeMap[selectedState];
            return city.stateCode === stateCode && city.countryCode === selectedCountry;
          });
          setCities(filteredCities);

          // Set full state data
          const stateData = states.find((state) => state.name === selectedState);
          setFullStateData(stateData);

          // Set full city data
          const cityData = filteredCities.find((city) => city.name === selectedCity);
          setFullCityData(cityData);
        });
    } else {
      setCities([]); // Clear cities when no state is selected
      setFullStateData(null);
      setFullCityData(null);
    }
  }, [selectedState, selectedCountry, stateCodeMap, states]);

  useEffect(() => {
    if (selectedCity) {
      fetch("/cities.json")
        .then((response) => response.json())
        .then((data) => {
          const cityData = data.find((city) => city.name === selectedCity && city.stateCode === stateCodeMap[selectedState] && city.countryCode === selectedCountry);
          setFullCityData(cityData);
        });
    } else {
      setFullCityData(null);
    }
  }, [selectedCity, selectedState, selectedCountry, stateCodeMap]);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedState("");
    setSelectedCity("");
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity("");
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  return (
    <div>
      <h2>Select Country, State, and City</h2>

      {/* Country Component */}
      <Country countries={countries} selectedCountry={selectedCountry} onCountryChange={handleCountryChange} />

      {/* State Component */}
      <State
        states={states.map((state) => state.name)}
        selectedState={selectedState}
        onStateChange={handleStateChange}
        disabled={!selectedCountry} // Disable if no country is selected
      />

      {/* City Component */}
      <City
        cities={cities.map((city) => city.name)}
        selectedCity={selectedCity}
        onCityChange={handleCityChange}
        disabled={!selectedState} // Disable if no state is selected
      />
    </div>
  );
};

export default CountryStateCity;
