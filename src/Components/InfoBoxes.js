import React from 'react';
import './InfoBoxes.css';
import { Avatar, Card, CardContent, Typography } from '@material-ui/core'


function InfoBoxes({title, cases, total, flag}) {
    return (
        <div>

            <Card className="infobox__card" >

             <CardContent className="infobox__cardContent">
              <Typography className="infobox__title" color="textSecondary">
                 {title} 👹
               
              </Typography >

              <h2  className="infobox__cases"> {cases}</h2>

              <Typography className="infobox__totale" color="textSecondary">
              <p>{total} Total cases</p>
              </Typography>
             </CardContent>
            </Card>
        </div>
    )
}

export default InfoBoxes
