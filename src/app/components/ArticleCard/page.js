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
        const response = await pizzaApi.getArticleWithTypeProduit("Pizza");
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
    <div className="flex flex-wrap gap-10">
      {article.map((item, index) => (
        <div
          key={index}
          className="bg-white text-black p-4 w-[300px] h-[300px] border border-black rounded-md"
        >
          <p className="text-lg font-semibold">{item.articleName}</p>
          <p className="text-sm">{item.typeProduitName}</p>
          <p className="text-sm">Taille : {item.taille}</p>
          <p className="text-sm">Prix : {item.prixTtc} €</p>
        </div>
      ))}
    </div>
  );
}
