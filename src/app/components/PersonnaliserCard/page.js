import React from "react";
import Image from "next/image";

export default function PersonnaliserCard({
  idArticle,
  prixTtc,
  image,
  articleName,
  description,
  taille,
  tailleUnite,
  onClose, // Nouvelle prop pour gérer la fermeture
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="relative w-[300px] h-auto bg-white text-black p-4 shadow-lg border-opacity-20 border-black border rounded-md z-10">
        <div className="flex justify-center mt-4">
          <Image
            src={`/images/${image}`}
            alt="Image de l'article"
            width={180}
            height={180}
            className="object-cover"
          />
        </div>
        <div className="w-auto h-auto bg-white text-black p-4 shadow-lg border-opacity-20 border-black border rounded-md mt-8 text-center">
          <p className="text-2xl font-semibold">{articleName}</p>
          <p className="text-xl text-red-500 mt-2">{prixTtc} €</p>
          <p className="text-sm mt-2 text-gray-500 italic">{description}</p>
          <p className="text-sm mt-2">
            Taille: {taille} {tailleUnite}
          </p>
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={onClose}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
