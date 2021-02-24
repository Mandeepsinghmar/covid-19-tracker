import React from 'react';
import NewsArticle from './NewsArticle'
import './NewsArticle.css';
const [data, setData] = useState();


useEffect(() => {

  const date = new Date();

  const fetchNewsData = async () => {
    await fetch(`http://newsapi.org/v2/everything?q=covid-19&from=${date}&sortBy=publishedAt&apiKey=306e4ef5f4d74db48578dd636437e620`)
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      setData(data);
    })
  }

  fetchNewsData();

}, []);

function News() {
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
