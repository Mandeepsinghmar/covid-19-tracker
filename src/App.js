import React, { useState, useEffect } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import LineGraph from "./LineGraph";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import { sortData, prettyPrintStat, prettyPrintTotal } from "./util";
import "leaflet/dist/leaflet.css";
import NewsArticle from "./NewsArticle";


function App() {
  //Using hooks for managing the state in the functional component
  const [countries, setCountries] = useState(["USA", "UK", "INDIA"]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 20, lng: 30 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");
 const [newsData, setNewsData] = useState();


useEffect(() => {

  const fetchNewsData =  async () => {
    await fetch('https://coronavirus-smartable.p.rapidapi.com/news/v1/US/',
      {
        headers: {
          "x-rapidapi-key": "bc6835fed4msh98afeb778d02be8p1b0388jsn0da601751930",
	"x-rapidapi-host": "coronavirus-smartable.p.rapidapi.com",
	"useQueryString": true,
  'Content-Type': 'application/json',
  mode: 'no-cors',
        },
      
        cache: 'no-cache'
      }
    )
    .then(response => response.json())
    .then((data) => {
      console.log(data.news);
      setNewsData(data.news);
    })
  }

  fetchNewsData();

}, []);

  // useEffect - hook in react
  useEffect(() => {
    // The code here will run once when the component loads and not again after

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);
  // [] -- condition that means whenever the variable changes run this piece of code

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        if (typeof data.countryInfo == "undefined") {
          setMapCenter([20, 30]);
          setMapZoom(2);
        } else {
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(4);
        }
      });
  };

// console.log(newsData)


  return (

    <div className="app">
      
      <div className="app__header">
          <h1>COVID TRACKER</h1>
         
<FormControl className="app__dropdown">
  
<Select  className="app__select"
              variant="outlined"
              value={country}
              onChange={onCountryChange}
             >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>

  </FormControl>           
        
        </div>

        
      <div className="app__container">
     
      <div className="app__left">
      
        <div className="app__stats">
        
          <InfoBox
            isRed
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintTotal(countryInfo.cases)}
          />
          <InfoBox
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintTotal(countryInfo.recovered)}
          />
          <InfoBox
            isRed
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintTotal(countryInfo.deaths)}
          />
        
        </div>

        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>



      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by country </h3>
          <Table countries={tableData}/>
          <h3 className="app__graphTitle">Worldwide new {casesType}</h3>
          <LineGraph className="app__graph" casesType={casesType} />
        </CardContent>
      </Card>

      </div>
      <Card className="app__news">
        <h1>Coronavirus Latest News</h1>
      <NewsArticle data={newsData}/>
      </Card>


    </div>
  );
}

export default App;