"use client";
import React, { useEffect, useState } from "react";
import pizzaApi from "../../api/pizzaApi";
import axios from "axios";

export default function ArticleCard({ idArticle, taille }) {
  console.log(idArticle, taille);
  const [article, setArticle] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await pizzaApi.getArticleWithTaille(idArticle, taille);
        console.log(response.data);
        setArticle(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    console.log(article);
    return () => {
      //nettoyage au démontage du composant
    };
  }, [idArticle, taille]);

  //articleName
  //prixTtc
  //taille
  //typeProduitName
  return (
    <div className="article-card">
      <p>{article.articleName}</p>
      <p>{article.typeProduitName}</p>
      <p>Taille : {article.taille}</p>
      <p>Prix : {article.prixTtc} €</p>
    </div>
  );
}
