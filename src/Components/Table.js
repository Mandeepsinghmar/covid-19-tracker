import React from 'react';
import './table.css';
import { Avatar, Typography } from '@material-ui/core';

function Table({ countries }) {
    return (
        <Typography className="table">
           {
             countries.map(country => (
               
       
                      <tr>
                     <td className="table__country"><Avatar alt="flag" src={country.countryInfo.flag}/> {country.country}  </td>
                     
                     <td>
                         <strong>{country.cases}</strong>
                         </td>
                 </tr>
                
           
             ))
           }
         
        </Typography>
    )
}

export default Table
