import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {deliveryClient } from "./config";

function ArticleListing() {
  
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(true);

  
  const getArticles = () => {
    return deliveryClient 
      .items()
      .type("article")
      .elementsParameter(["url_pattern", "title"])
      .toObservable()
      .subscribe((response) => {
        setArticles(response.items);
        setLoading(false);
      });
  };

  useEffect(() => {
    const subscription = getArticles();
    return () => subscription.unsubscribe();
  }, []);

  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  
  return (
    <ul>
      {articles.map((article) => {
        return (
          <li key={article.url_pattern.value}>
            <Link to={`/post/${article.url_pattern.value}`}>{article.title.value}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default ArticleListing;