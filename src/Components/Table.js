import React from 'react';
import './table.css';
import { Typography } from '@material-ui/core';

function Table({ countries }) {
    return (
        <Typography className="table">
           {
             countries.map(({ country, cases}) => (
               
                    
                      <tr>
                     <td>{country}</td>
                     <td>
                         <strong>{cases}</strong>
                         </td>
                 </tr>
                
               
             ))
           }
         
        </Typography>
    )
}

export default Table
