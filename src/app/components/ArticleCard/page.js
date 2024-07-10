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
  DropdownItem,
} from "@nextui-org/dropdown";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/slices/cartSlice";
import pizzaApi from "../../api/pizzaApi";
import Image from "next/image";
import PersonnaliserCard from "../PersonnaliserCard/page";

export default function ArticleCard({ selectedCategorie }) {
  const [articles, setArticles] = useState([]);
  const [taille, setTaille] = useState(26); // Taille par défaut, peut être modifiée si nécessaire
  const [allArticles, setAllArticles] = useState([]); // Tous les articles non filtrés
  const [selectedArticle, setSelectedArticle] = useState(null); // State for selected article to customize
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await pizzaApi.getArticleWithTypeProduit(
          selectedCategorie
        );
        if (selectedCategorie === 1) {
          setAllArticles(response.data);
          const filteredArticles = response.data.filter(
            (article) => article.taille === taille
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
  }, [selectedCategorie]);

  useEffect(() => {
    if (selectedCategorie === 1) {
      const filteredArticles = allArticles.filter(
        (article) => article.taille === taille
      );
      setArticles(filteredArticles);
    }
  }, [taille, selectedCategorie, allArticles]);

  const addToCartHandler = (item) => {
    dispatch(addToCart({ ...item, qty: 1 }));
  };

  const customizeHandler = (item) => {
    setSelectedArticle(item);
  };

  const closeHandler = () => {
    setSelectedArticle(null);
  };

  return (
    <>
      {selectedCategorie === 1 && (
        <div className="pl-40">
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="bordered"
                className="bg-black text-white text-xl h-[50px]"
              >
                Taille Pizza
                <IoMdArrowDropdownCircle className="ml-2" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Static Actions"
              className="bg-black text-white rounded-lg text-center"
            >
              <DropdownItem
                key="26cm"
                className="hover:bg-gray-700"
                onClick={() => setTaille(26)}
              >
                <span className="text-xl">26 cm</span>
              </DropdownItem>
              <DropdownItem
                key="31cm"
                className="hover:bg-gray-700"
                onClick={() => setTaille(31)}
              >
                <span className="text-xl">31 cm</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      )}

      <div className="flex flex-wrap gap-10 pl-40 pr-12 pt-8 pb-8 w-[95%] relative">
        {articles.map((item, index) => (
          <div
            key={index}
            className="bg-white text-black p-4 w-[300px] h-[535px] shadow-lg border-opacity-20 border-black border rounded-md text-center mb-4"
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
            <p className="text-2xl font-semibold mt-10">{item.articleName}</p>
            <p className="text-sm mt-3 text-gray-500 italic h-[60px]">
              {item.description}
            </p>
            <p className="text-sm mt-3">
              Taille de l'article : {item.taille} {item.tailleUnite}
            </p>
            <p className="text-2xl text-red-500 mt-3">{item.prixTtc} €</p>
            <Button
              radius="full"
              className="bg-teal-600 text-white mt-3 hover:bg-teal-700 h-[50px] w-[220px] flex items-center justify-center space-x-2 mx-auto text-lg"
              onClick={() => customizeHandler(item)}
            >
              <CiPizza />
              <span>Personnaliser</span>
            </Button>
            <Button
              radius="full"
              className="bg-green-600 text-white mt-3 hover:bg-green-700 h-[50px] w-[220px] flex items-center justify-center space-x-2 mx-auto text-lg"
              onClick={() => addToCartHandler(item)}
            >
              <BsCart4 />
              <span>Ajouter au panier</span>
            </Button>
          </div>
        ))}
      </div>

      {selectedArticle && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-75"></div>
          <PersonnaliserCard
            idArticle={selectedArticle.id}
            prixTtc={selectedArticle.prixTtc}
            image={selectedArticle.image}
            articleName={selectedArticle.articleName}
            description={selectedArticle.description}
            taille={selectedArticle.taille}
            tailleUnite={selectedArticle.tailleUnite}
            onClose={closeHandler}
          />
        </div>
      )}
    </>
  );
}
