"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter,
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
    <AlertDialogContent className="max-w-full w-full max-h-[90vh] overflow-y-auto p-4">
      <div className="space-y-4">
        <div className="relative w-full h-52 rounded-md overflow-hidden">
          <Image
            src="/burger.jpg"
            alt="Cannibale"
            fill
            className="object-cover"
          />
        </div>
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Cannibale</h2>
          <p className="text-orange-600 text-xl font-semibold">{prixAffiche}</p>
          <p className="text-muted-foreground">
            Sauce barbecue, mozzarella, poulet rôti, merguez, haché au bœuf goût
            flambé.
          </p>
        </div>
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
        Suppléments
        <div className="relative max-w-md mx-auto">
          {/* Container scrollable */}
          <div className="scroll-container">
            {toppings.map((ingr, idx) => (
              <div
                key={idx}
                className="
          snap-start flex flex-col items-center justify-between
          rounded px-3 py-2 border
        "
              >
                <span className="bg-orange-500 px-3 text-white text-sm rounded">
                  {ingr.price}€
                </span>
                <Image
                  src="/burger.jpg"
                  alt={ingr.name}
                  width={400}
                  height={400}
                  className="rounded-full object-cover h-12 w-12"
                />
                <span className="text-sm">{ingr.name.toUpperCase()}</span>
                <div className="flex items-center gap-2 mt-2">
                  <Button variant="outline" size="icon">
                    −
                  </Button>
                  <span>1</span>
                  <Button variant="outline" size="icon">
                    +
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Optional: dégradés aux extrémités pour un effet “fade” */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </div>

      <AlertDialogFooter className="mt-6">
        <AlertDialogCancel>Annuler</AlertDialogCancel>
        <AlertDialogAction className="bg-orange-600 hover:bg-orange-700">
          Ajouter au panier
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
