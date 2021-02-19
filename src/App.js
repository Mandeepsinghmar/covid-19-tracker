import react, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import './App.css';
import InfoBoxes from './Components/InfoBoxes';
import Map from './Components/Map';
import Graph from './Components/Graph';
import Table from './Components/Table'

function App() {
const [ countries, setCountries] = useState([]);
const [ country, setCountry] = useState("Worldwide");

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
 
}, []);

const onCountryChange = (e) => {
const countryCode = e.target.value;

setCountry(countryCode)

};

  return (
    <div className="App">

      <div className="app__header">
             {/* header */}
             <h2>covid-19 tracker</h2>

            {/* select countries */}
        <FormControl className="app__dropdown">
        
          <Select variant="outlined" onChange={onCountryChange} value={country} >
      
          <MenuItem value="Worldwide">Worldwide</MenuItem>
            {/* loop through all the countries and show a dropdown menu */}
           {countries.map((country) => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
           ))}
            
          </Select>

        </FormControl>
            
      </div>

      <div className="app__infobox">
        <InfoBoxes title="Coronavirus cases" cases="200" total="5M"/>
        <InfoBoxes title="Recovered cases" cases="300" total="2M"/>
        <InfoBoxes title="Deaths cases" cases="400" total="4M"/>
      </div>
    
  <div className="app__map">
     <Map />
   </div> 

   <div className="app__table">
     <Table />
   </div> 

   <div className="app__graph">
     <Graph />
   </div> 
   
    </div>
  );
}

export default App;
