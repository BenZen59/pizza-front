"use client";
import React, { useEffect, useState } from "react";
import { CiPizza } from "react-icons/ci";
import { BsCart4 } from "react-icons/bs";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import pizzaApi from "../../api/pizzaApi";
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
    <>
      <div className="pl-12">
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
              className="bg-black text-white text-xl h-[50px]"
            >
              Taille Pizza
              <IoMdArrowDropdownCircle />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Static Actions"
            className="bg-black text-white rounded-lg p-4 text-center"
          >
            <DropdownItem key="26cm" className="hover:bg-gray-700">
              <span className="text-xl">26 cm</span>
            </DropdownItem>
            <DropdownItem key="31cm" className="hover:bg-gray-700">
              <span className="text-xl">31 cm</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="flex flex-wrap gap-10 pl-12 pt-8 pb-8">
        {articles.map((item, index) => (
          <div
            key={index}
            className="bg-white text-black p-4 w-[300px] h-[515px] shadow-lg border-opacity-20 border-black border rounded-md text-center"
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
            <p className="text-sm mt-3">
              Taille de l'article : {item.taille} cm
            </p>
            <p className="text-2xl text-red-500 mt-3">{item.prixTtc} €</p>
            <Button
              radius="full"
              className="bg-blue-600 text-white mt-3 hover:bg-blue-700 h-[50px] w-[220px] flex items-center justify-center space-x-2 mx-auto text-lg"
            >
              <CiPizza />
              <span>Personnaliser</span>
            </Button>
            <Button
              radius="full"
              className="bg-green-600 text-white mt-3 hover:bg-green-700 h-[50px] w-[220px] flex items-center justify-center space-x-2 mx-auto text-lg"
            >
              <BsCart4 />
              <span>Ajouter au panier</span>
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
