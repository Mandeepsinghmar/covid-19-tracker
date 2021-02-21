import React from "react";
import numeral from "numeral";
import "./Table.css";


function Table({ countries }) {
  return (
    <div className="table">
      {countries.map(({ country, cases, countryInfo}) => (
        <tr>
          <td> <img alt="flag" src={countryInfo.flag}/> {country} </td>
          <td>
            <strong>{numeral(cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
