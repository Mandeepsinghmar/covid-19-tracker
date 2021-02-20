import react, { useState, useEffect } from 'react';
import { Select, Typography, MenuItem, FormControl, Card, InputLabel, CardContent } from '@material-ui/core'
import './App.css';
import './Components/InfoBoxes.css'
import InfoBoxes from './Components/InfoBoxes';
import Map from './Components/Map';
import Graph from './Components/Graph';
import Table from './Components/Table'
import { sortData } from './Components/util'

function App() {
const [ countries, setCountries] = useState([]);
const [ country, setCountry] = useState("Worldwide");
const [ countryInfo, setCountryInfo] = useState({});
const [ tableData, setTableData] = useState([]);

useEffect(() => {
 
  fetch('https://disease.sh/v3/covid-19/all')
  .then(response => response.json())
  .then(data => {
    setCountryInfo(data);
  })
  }, [])

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

   const sortedData = sortData(data);
   setTableData(sortedData);
   setCountries(countries);
 });
 };
 countriesData();
 
}, [countries]);

const onCountryChange = async (e) => {
const countryCode = e.target.value;

const url = countryCode === 'Worldwide' 
? 'https://disease.sh/v3/covid-19/all' 
: `https://disease.sh/v3/covid-19/countries/${countryCode}`

await fetch(url)
.then(response => response.json())
.then(data => {
  setCountry(countryCode);
  setCountryInfo(data);
  console.log(data);
})
};
  return (
    <div className="app">

   <div className="app__left">
   <div className="app__header">
             {/* header */}
             <Typography className="app__logo">COVID-19 TRACKER</Typography>

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

        <InfoBoxes title="Coronavirus cases" total={countryInfo.cases} cases={countryInfo.todayCases} />
        <InfoBoxes title="Recovered cases" total={countryInfo.recovered} cases={countryInfo.todayRecovered} />
        <InfoBoxes title="Deaths cases" total={countryInfo.deaths} cases={countryInfo.todayDeaths} />
      </div>
    
     <Map />

   </div>
     
     <Card className="app__right">
      <CardContent>
      <h3>Live cases by country</h3>
     <Table countries={tableData}/>
      </CardContent>
      

     <Graph />
     </Card>


   </div>

  );
}

export default App;
