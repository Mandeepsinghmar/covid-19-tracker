import React from 'react';
import NewsArticle from './NewsArticle'
import './NewsArticle.css'

function News({ data }) {
    return (
        <div className="news">
            {
      data ? data.articles.map((article, index) => (
               
            <NewsArticle data={article} index={index}/>
                  )) : "Loading"
                }
        </div>
    )
}

export default News
