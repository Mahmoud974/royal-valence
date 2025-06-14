"use client";
import { useCardStore } from "@/store/useElementStore";
import { CirclePlus, CircleX, Pen } from "lucide-react";
import Image from "next/image";
import React  from "react";
import Artwork from "./Artwork";

export default function Basket() {
  const { cart, addBasket, removeFromCart } = useCardStore();
 

  const suggestions = [
    { id: 101, name: "Cheesy Bread", price: 4.49 },
    { id: 102, name: "Kick'n chicken", price: 6.49 },
    {
      id: 103,
      name: "Cheese Rolls XL - 6 Gouda & Emmental et 6 Pepperoni",
      price: 8.49,
    },
  ];

  const handleQuantity = (index: number, delta: number) => {
    const updated = [...cart];
    updated[index].quantity = Math.max(
      1,
      (updated[index].quantity || 1) + delta
    );
  };

  const handleAddSuggestion = (product) => {
    const exists = cart.find((item) => item.nom === product.name);
    if (exists) {
      handleQuantity(cart.indexOf(exists), 1);
    } else {
      addBasket({
        nom: product.name,
        description: "Produit suggéré",
        prix: product.price,
        pates: [],
        quantity: 1,
      });
    }
  };

  const total = cart.reduce(
    (acc, item) => acc + item.prix * (item.quantity || 1),
    0
  );

  return (
    <main className="bg-white w-full h-full shadow-md rounded-2xl">
      <div className="p-4 sm:p-6 lg:p-7">
        <div className="flex justify-start flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <p className="font-semibold text-md">Mercredi 12 juillet 2025 • 18:15 </p>
          <div className="flex items-center">
          <p className="text-sm text-gray-500">
              Adresse : 78 rue Victor Hugo - Valence 26000 
            </p>
            <Pen className="w-4 text-orange-500 ml-1"/>
            
          </div>
            <p className="text-sm text-gray-500">
              Order #925  
            </p>
         
          </div>
          
        </div>
        
 

        <div className="mt-7 space-y-4">
          <h3 className="text-md font-bold">🛒 Détail de la commande <span className="rounded-xs py-1 bg-orange-600 px-2 text-white">Dine in </span></h3>
          
          {cart.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <Image
                width={74}
                height={74}
                src="/burger.jpg"
                alt={item.nom}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1 sm:ml-4 text-center sm:text-left">
                <p className="text-md font-bold">{item.nom}</p>
                <p className="text-md text-xs">Medium</p>
             
                <div className="flex justify-center sm:justify-start items-center mt-1">
                  
                  <button
                    className="bg-orange-500 rounded-full text-white w-8 h-8 flex items-center justify-center"
                    onClick={() => handleQuantity(idx, -1)}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity || 1}</span>
                  <button
                    className="bg-orange-500 rounded-full text-white w-8 h-8 flex items-center justify-center"
                    onClick={() => handleQuantity(idx, 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-orange-500 font-bold text-sm sm:text-base">
                  €{(item.prix * (item.quantity || 1)).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.nom)}
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                  title="Supprimer"
                >
                  <CircleX size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 text-gray-600 rounded-md my-4 p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <p>Total</p>
            <p>{total.toFixed(2)} €</p>
          </div>
          <div className="flex justify-between text-sm">
            <p>Tax</p>
            <p>{(total * 0.1).toFixed(2)} €</p>
          </div>
          <hr className="border-dashed border-gray-400 my-2" />
          <div className="flex font-bold justify-between text-base">
            0 article | {(total * 1.1).toFixed(2)} €
            
            <p>Payer</p>
          </div>
        </div>

        <div className="mt-6">
          <button className="bg-orange-600 text-white w-full py-3 rounded-md hover:bg-orange-700 transition">
            Commander
          </button>
        </div>
        <div className="mt-3">
          <h3 className="text-md font-bold">{ ` ❤️   Favoris`}</h3>
          <div className="flex  bg-gray-50 text-gray-600 rounded-md my-4 p-4  ">


          <Artwork/>
     
        
          </div>
        </div>
        <div className="mt-3">
          <h3 className="text-md font-bold">{ ` 🎨  Mes oeuvres d'art`}</h3>
          <div className="flex  bg-gray-50 text-gray-600 rounded-md my-4 p-4  ">


          <Artwork/>
     
        
          </div>
        </div>

        <div className="mt-10 bg-gray-50 rounded-xl p-4">
          <h3 className="font-semibold text-lg mb-3 text-center sm:text-left">
            Vous pourriez aimer :
          </h3>
          <div className="space-y-3">
            {suggestions.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center border-t pt-2"
              >
                <div className="flex-1 pr-2">
                  <p className="text-sm">{product.name}</p>
                  <p className="text-sm font-bold">
                    {product.price.toFixed(2)} €
                  </p>
                </div>
                <button
                  onClick={() => handleAddSuggestion(product)}
                  className=" ml-3 flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-700 hover:bg-green-200"
                >
                  <CirclePlus size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
