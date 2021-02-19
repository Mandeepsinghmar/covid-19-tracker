import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core'


function InfoBoxes({title, cases, total}) {
    return (
        <div>
            <Card className="infobox__card" >
             <CardContent>
              <Typography className="infobox__title" color="textSecondary">
                 {title}
              </Typography >

              <h2  className="infobox__cases">{cases}</h2>

              <Typography className="infobox__totale" color="textSecondary">
              <p>{total} Total</p>
              </Typography>
             </CardContent>
            </Card>
        </div>
    )
}

export default InfoBoxes
