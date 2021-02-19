import react, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl } from '@material-ui/core'
import './App.css';

function App() {
const [ countries, setCountries] = useState([]);
const [ country, setCountry] = useState(["Worldwide"]);

useEffect(() => {

 const countriesData = async () => {

  await fetch('https://disease.sh/v3/covid-19/countries')
 .then(response => response.json())
 .then((data)  => {
   const countries = data.map((country) => (
     {
     name: country.country,
     value: country.countryInfo.iso2,
   }
   ));
   setCountries(countries)
 });
 };
 countriesData();
 
}, [])

  return (
    <div className="App">

      <div className="app__header">
             {/* header */}
             <h2>covid-19 tracker</h2>

            {/* select countries */}
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} >
          <MenuItem value="worldwide">Worldwide</MenuItem>
            {/* loop through all the countries and show a dropdown menu */}
           {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
           ))}
            
          </Select>

        </FormControl>
            
      </div>

      <div className="app__infobox">
          {/* infoboxes */}
          {/* infoboxes */}
          {/* infoboxes */}

      </div>
    
      {/* map */}
      {/* table */}
      {/* graph */}
    </div>
  );
}

export default App;
