"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import pizzaApi from "../../api/pizzaApi";
import ArticleCard from "../ArticleCard/page";

export default function MenuArticle() {
  const [categorie, setCategorie] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState(1); // ID de la catégorie par défaut (Pizza)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await pizzaApi.getTypeProduit();
        setCategorie(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Notez le tableau de dépendances vide ici pour éviter les réexécutions inutiles

  const handleCategoryClick = (category) => {
    setSelectedCategorie(category);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-10 p-12 justify-center">
        {categorie.map((item, index) => (
          <div key={index} className="text-gray-500 text-xl">
            <Button
              radius="full"
              className={`w-40 h-16 flex items-center justify-center border-4 px-4 py-2 text-xl ${
                selectedCategorie === item.idTypeProduit
                  ? "bg-red-500 text-white"
                  : "border-gray-500"
              }`}
              onClick={() => handleCategoryClick(item.idTypeProduit)}
            >
              {item.libelle}
            </Button>
          </div>
        ))}
      </div>
      <ArticleCard selectedCategorie={selectedCategorie} />{" "}
      {/* Passer selectedCategorie à ArticleCard */}
    </div>
  );
}
