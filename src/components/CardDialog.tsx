"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toppings } from "@/app/data/toppings";
import { ShoppingBasket } from "lucide-react";

export default function CardDialog() {
  const tailleOptions = [
    { label: "Petit", value: "small", idx: 0 },
    { label: "Medium", value: "medium", idx: 1 },
    { label: "Grand", value: "large", idx: 2 },
  ];

  const [taille, setTaille] = useState("medium");

  const prix = [10.99, 12.99, 14.99];
  const pates = ["Pâte Fine", "Pâte Épaisse"];

  const tailleIdx = tailleOptions.find((opt) => opt.value === taille)?.idx ?? 1;
  const prixAffiche =
    Array.isArray(prix) && typeof prix[tailleIdx] === "number"
      ? `${prix[tailleIdx].toFixed(2)} €`
      : "Prix indisponible";

  return (
    <AlertDialogContent className="max-w-[95vw] w-full max-h-[90vh]   flex flex-col p-4">
      <AlertDialogDescription></AlertDialogDescription>

      {/* Contenu principal scrollable */}
      <div className="flex-1 overflow-y-auto overscroll-none ">
        <div className="flex flex-col md:flex-row gap-6 w-full container">
          {/* Image à gauche */}
          <div className="relative w-full md:w-[300px] h-52 md:h-auto rounded-md overflow-hidden flex-shrink-0">
            <Image
              src="/burger.jpg"
              alt="Cannibale"
              fill
              className="object-cover"
            />
          </div>

          {/* Contenu à droite */}
          <div className="flex-1 min-w-0 space-y-4">
            <div className="space-y-1">
              <AlertDialogTitle>
                <div className="flex justify-between mb-3">
                <p className="text-2xl font-bold">Cannibale</p>
                <p className="bg-orange-600 px-2 text-white text-2xl font-semibold">
                  {prixAffiche}
                </p>
                </div>
                <p className="font-normal">
                  Sauce barbecue, mozzarella, poulet rôti, merguez, haché au bœuf goût flambé.
                </p>
              </AlertDialogTitle>
            </div>

            <div className="space-y-4 flex justify-between">
              <div>
                <label className="font-semibold mb-1 block">Taille</label>
                <Select defaultValue={taille} onValueChange={setTaille}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Taille" />
                  </SelectTrigger>
                  <SelectContent>
                    {tailleOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label} : {prix[option.idx].toFixed(2)} €
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {pates.length > 0 && (
                <div>
                  <label className="font-semibold mb-1 block">Pâte</label>
                  <Select defaultValue={pates[0]}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pâte" />
                    </SelectTrigger>
                    <SelectContent>
                      {pates.map((pate, idx) => (
                        <SelectItem key={idx} value={pate}>
                          {pate}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <label className="font-semibold mb-1 block">Sauce</label>
                <Select defaultValue="Base Sauce BBQ">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sauce" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Base Sauce BBQ">Base Sauce BBQ</SelectItem>
                    <SelectItem value="Sauce tomate">Sauce tomate</SelectItem>
                    <SelectItem value="Crème fraîche">Crème fraîche</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="-mt-2">
              <h3 className="font-bold mb-2">Suppléments</h3>
              <div className="scroll-container">
            {toppings.map((ingr, idx) => (
              <div
                key={idx}
                className="
          snap-start flex flex-col items-center justify-between
           px-3 py-2 border border-slate-100 rounded-md
        "
              >
                <Image
                  src={`/supplements/${ingr.image}.png`}
                  alt={ingr.name}
                  width={400}
                  height={400}
                  className="rounded-full object-cover h-12 w-12"
                />
                <span className="text-sm text-center">
                  {ingr.name.toUpperCase()}
                </span>
                <span className="bg-orange-500 px-3 text-white text-sm rounded">
                  +{ingr.price}€
                </span>
                <div className="flex items-center gap-2 mt-2 bg-orange-500 rounded-full">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-orange-600 border-none text-white"
                  >
                    −
                  </Button>
                  <span className="text-white font-bold">1</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-orange-600 border-none text-white"
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer toujours visible en bas */}
      <AlertDialogFooter className=" ">
        <AlertDialogCancel className="cursor-pointer">Annuler</AlertDialogCancel>
        <AlertDialogAction className="bg-orange-600 hover:bg-orange-700">
          <ShoppingBasket />
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
