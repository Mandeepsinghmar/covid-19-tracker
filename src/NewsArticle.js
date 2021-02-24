import React from 'react';
import moment from 'moment'
import './NewsArticle.css'


function NewsArticle({data}) {
const date = new Date();

    return (
        <div className="news__card">
          { data && data.map((news, index) => (
        //    console.log(news)
           <div  className="newsarticle__container" >
              {/* <img alt={index} src={news.images[0].url} /> */}      
           <p className="title">{news.title}</p>
           <p className="desc">{news.excerpt}</p>
           <a href={news.originalUrl} target="_blank">Read Article</a>
           </div>
           ))
          } 
          
        </div>
    )
}

export default NewsArticle
