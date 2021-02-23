import React from 'react';
import moment from 'moment'
import './NewsArticle.css'


function NewsArticle({data, index}) {
const date = new Date();

    return (
        <div className="news__card">
           
            <div  className="newsarticle__container" >
            <img alt={index} src={data.urlToImage} />
          
            
            <p className="date"> {moment(new Date()).format("MMMM Do YYYY")}</p>
            
       
           
            <p className="title">{data.title}</p>
     
            <button>Read Article</button>

           

            </div>
          

           

          
        </div>
    )
}

export default NewsArticle
