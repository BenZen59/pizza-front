import React, { useEffect, useState } from "react";
import Image from "next/image";
import pizzaApi from "@/app/api/pizzaApi";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function PersonnaliserCard({
  idArticle,
  prixTtc,
  image,
  articleName,
  description,
  taille,
  tailleUnite,
  onClose,
}) {
  const [compositions, setCompositions] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [prixTotal, setPrixTotal] = useState(prixTtc);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await pizzaApi.getCompositionPizza(idArticle);
        setCompositions(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [idArticle]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await pizzaApi.getAllIngredients();
        setIngredients(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const updateQuantityHandler = (item, newQty) => {
    if (newQty < 0 || newQty > 3) return;

    let updatedCompositions = [...compositions];
    const existingItemIndex = updatedCompositions.findIndex(
      (composition) => composition.ingredients === item.libelle
    );

    if (existingItemIndex !== -1) {
      const existingItem = updatedCompositions[existingItemIndex];

      if (newQty > existingItem.quantite) {
        setPrixTotal((prevPrix) => prevPrix + item.prix);
      } else {
        setPrixTotal((prevPrix) => prevPrix - item.prix);
      }

      if (newQty === 0) {
        updatedCompositions = updatedCompositions.filter(
          (composition) => composition.ingredients !== item.libelle
        );
      } else {
        updatedCompositions[existingItemIndex].quantite = newQty;
      }
    } else {
      if (newQty > 0) {
        updatedCompositions.push({
          id: item.id,
          ingredients: item.libelle,
          quantite: newQty,
          prix: item.prix,
        });
        setPrixTotal((prevPrix) => prevPrix + item.prix);
      }
    }

    setCompositions(updatedCompositions);
  };

  const getInitialQuantity = (ingredient) => {
    const compositionItem = compositions.find(
      (composition) => composition.ingredients === ingredient.libelle
    );
    return compositionItem ? compositionItem.quantite : 0;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative w-[1040px] h-[790px] bg-white text-black p-4 shadow-lg border-opacity-20 border-black border rounded-md z-10 overflow-y-auto">
        <div className="flex justify-center w-[700px] h-auto bg-white text-black p-4 shadow-lg border-opacity-20 border-black border rounded-md mt-8 text-center ml-[15%]">
          <div className="flex justify-center mt-2">
            <Image
              src={`/images/${image}`}
              alt="Image de l'article"
              width={180}
              height={180}
              className="object-cover mr-5"
            />
          </div>
          <div className="mt-10">
            <p className="text-2xl font-semibold">{articleName}</p>
            <p className="text-xl text-red-500 mt-2">
              {prixTotal.toFixed(2)} €
            </p>
            <p className="text-sm mt-2 text-gray-500 italic">{description}</p>
            <p className="text-sm mt-2">
              Taille : {taille} {tailleUnite}
            </p>
          </div>
        </div>
        <div className="flex mt-8 space-x-4">
          {/* Composition */}
          <div className="w-[400px] max-h-[400px] bg-white text-black shadow-lg border-opacity-20 border-black border rounded-md text-center pl-4 pt-4 pr-4 overflow-y-auto">
            <p className="text-left text-2xl font-semibold mb-2">
              Compositions
            </p>
            {compositions.map((item) => (
              <div
                key={item.id}
                className="flex w-[360px] h-auto bg-white text-black p-4 shadow-lg border-opacity-20 border-black border rounded-md mb-4"
              >
                <div className="flex-grow">
                  <div className="mt-2 mr-1 w-[200px]">{item.ingredients}</div>
                </div>
                <div className="mt-2 flex justify-around items-center text-black space-x-2">
                  {item.quantite > 0 && (
                    <button
                      className="bg-black text-white rounded px-2 py-1 hover:bg-gray-800 h-8 w-8 flex items-center justify-center"
                      onClick={() =>
                        updateQuantityHandler(
                          {
                            ...item,
                            libelle: item.ingredients,
                            prix: item.prix,
                          },
                          item.quantite - 1
                        )
                      }
                    >
                      <FaMinus />
                    </button>
                  )}
                  <input
                    type="text"
                    value={item.quantite}
                    onChange={(e) =>
                      updateQuantityHandler(
                        { ...item, libelle: item.ingredients, prix: item.prix },
                        parseInt(e.target.value)
                      )
                    }
                    className="w-12 h-8 text-center border border-gray-500 rounded-md"
                  />
                  <button
                    className="bg-black text-white rounded px-2 py-1 hover:bg-gray-800 h-8 w-8 flex items-center justify-center"
                    onClick={() =>
                      updateQuantityHandler(
                        { ...item, libelle: item.ingredients, prix: item.prix },
                        item.quantite + 1
                      )
                    }
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Ingredients */}
          <div className="w-[580px] max-h-[400px] bg-white text-black shadow-lg border-opacity-20 border-black border rounded-md text-center pl-4 pt-4 pr-4 overflow-y-auto">
            <p className="text-left text-2xl font-semibold mb-2">Ingrédients</p>
            <div className="flex flex-wrap">
              {ingredients.map((item) => (
                <div
                  key={item.id}
                  className="w-[250px] h-[100px] bg-white text-black p-2 shadow-lg border-opacity-20 border-black border rounded-md mb-4 mr-3"
                >
                  <div className="flex justify-around items-center">
                    <div className="mt-1 mr-1 w-[180px] ">{item.libelle}</div>
                    <div className="mt-1 mr-1 w-[100px] text-red-500">
                      + {item.prix.toFixed(2)} €
                    </div>
                  </div>
                  <div className="mt-2 flex justify-center gap-1 items-center text-black space-x-2">
                    {getInitialQuantity(item) > 0 && (
                      <button
                        className="bg-black text-white rounded px-2 py-1 hover:bg-gray-800 h-8 w-8 flex items-center justify-center"
                        onClick={() =>
                          updateQuantityHandler(
                            item,
                            getInitialQuantity(item) - 1
                          )
                        }
                      >
                        <FaMinus />
                      </button>
                    )}
                    <input
                      type="text"
                      value={getInitialQuantity(item)}
                      onChange={(e) =>
                        updateQuantityHandler(item, parseInt(e.target.value))
                      }
                      className="w-12 h-8 text-center border border-gray-500 rounded-md"
                    />
                    <button
                      className="bg-black text-white rounded px-2 py-1 hover:bg-gray-800 h-8 w-8 flex items-center justify-center"
                      onClick={() =>
                        updateQuantityHandler(
                          item,
                          getInitialQuantity(item) + 1
                        )
                      }
                    >
                      <FaPlus />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <button
            className="bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
            onClick={onClose}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
