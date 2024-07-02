"use client";
import React, { useEffect, useState } from "react";
import pizzaApi from "../../api/pizzaApi";
import { CiPizza } from "react-icons/ci";
import { BsCart4 } from "react-icons/bs";
import Image from "next/image";

export default function ArticleCard({ selectedCategorie }) {
  const [articles, setArticles] = useState([]);
  const [taille, setTaille] = useState(26); // Taille par défaut, peut être modifiée si nécessaire
  console.log(selectedCategorie);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await pizzaApi.getArticleWithTypeProduit(
          selectedCategorie
        );

        // Vérifier si le type de produit est 'pizza'
        if (selectedCategorie === 1) {
          // Si c'est une pizza, filtrer par taille
          const filteredArticles = response.data.filter(
            (article) => article.taille === 26
          );
          setArticles(filteredArticles);
        } else {
          setArticles(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [selectedCategorie, taille]); // Mettre à jour le tableau de dépendances pour inclure selectedCategorie et taille

  return (
    <div className="flex flex-wrap gap-10 pl-12 pt-8 pb-8">
      {articles.map((item, index) => (
        <div
          key={index}
          className="bg-white text-black p-4 w-[300px] h-[515px] border border-black rounded-md text-center"
        >
          <div className="flex justify-center items-center h-[150px]">
            <Image
              src={`/images/${item.image}`}
              alt="Image de l'article"
              width={180}
              height={180}
              className="object-cover mt-6"
            />
          </div>
          <p className="text-2xl font-semibold mt-10">{item.libelle}</p>
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
