import React from "react";

export default function MessageConfirmationCommande({ onClose }) {
  const handleConfirm = () => {
    // Logic to handle order confirmation
    console.log("Order confirmed");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-md shadow-lg p-6 text-center">
        <p>Voulez-vous valider votre panier ?</p>
        <div className="mt-4 flex justify-around">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleConfirm}
          >
            Oui
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Non
          </button>
        </div>
      </div>
    </div>
  );
}
