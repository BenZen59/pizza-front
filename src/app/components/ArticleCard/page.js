"use client";
import React, { useEffect, useState } from "react";
import pizzaApi from "../../api/pizzaApi";
import { CiPizza } from "react-icons/ci";
import { BsCart4 } from "react-icons/bs";
import Image from "next/image";

export default function ArticleCard({ idArticle, taille }) {
  console.log(idArticle, taille);
  const [article, setArticle] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await pizzaApi.getArticleWithTypeProduit("Pizza");
        const filteredArticles = response.data.filter(
          (article) => article.taille === 26
        );
        setArticle(filteredArticles);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    console.log(article);
    return () => {};
  }, [idArticle, taille]);

  return (
    <div className="flex flex-wrap gap-10 pl-12 pt-8">
      {article.map((item, index) => (
        <div
          key={index}
          className="bg-white text-black p-4 w-[300px] h-[515px] border border-black rounded-md text-center"
        >
          <div className="flex justify-center items-center h-[150px]">
            <Image
              src={`/images/${item.image}`}
              alt="Picture of the article"
              width={180}
              height={180}
              className="object-cover mt-6"
            />
          </div>
          <p className="text-2xl font-semibold mt-10">{item.articleName}</p>
          <p className="text-sm mt-3 text-gray-500 italic h-[60px]">
            {item.description}
          </p>
          <p className="text-sm mt-3">Taille de l'article : {item.taille} cm</p>
          <p className="text-2xl text-red-500 mt-3">{item.prixTtc} €</p>
          <button className="bg-blue-600 text-white py-2 px-4 mt-3 rounded-full hover:bg-blue-700 w-[200px] flex items-center justify-center space-x-2 mx-auto">
            <CiPizza />
            <span>Personnaliser</span>
          </button>
          <button className="bg-green-600 text-white py-2 px-4 mt-3 rounded-full hover:bg-green-700 w-[200px] flex items-center justify-center space-x-2 mx-auto">
            <BsCart4 />
            <span>Ajouter au panier</span>
          </button>
        </div>
      ))}
    </div>
  );
}
