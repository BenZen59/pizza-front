"use client";
import React, { useEffect, useState } from "react";
import pizzaApi from "../../api/pizzaApi";

export default function MenuArticle() {
  const [categorie, setCategorie] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState("Pizza");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await pizzaApi.getTypeProduit();
        console.log("API response:", response); // Log the entire response object
        setCategorie(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Note the empty dependency array here to avoid unnecessary reruns

  const handleCategoryClick = (category) => {
    setSelectedCategorie(category);
  };

  return (
    <div className="flex flex-wrap gap-10 p-12 justify-center">
      {categorie.map((item, index) => (
        <div key={index} className="text-gray-500 text-xl">
          <button
            className={`w-40 h-16 flex items-center justify-center rounded-full border-4 px-4 py-2 ${
              selectedCategorie === item.libelle
                ? "bg-red-500 text-white"
                : "border-gray-500"
            }`}
            onClick={() => handleCategoryClick(item.libelle)}
          >
            {item.libelle}
          </button>
        </div>
      ))}
    </div>
  );
}
