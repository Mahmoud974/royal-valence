"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { AlertDialogFooter } from "@/components/ui/alert-dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function CardDialog() {
  const tailleOptions = [
    { label: "Petit", value: "small", idx: 0 },
    { label: "Medium", value: "medium", idx: 1 },
    { label: "Grand", value: "large", idx: 2 },
  ];

  const [taille, setTaille] = useState("medium");

  const prix = [10.99, 12.99, 14.99]; // Valeurs brutes provisoires
  const pates = ["Pâte Fine", "Pâte Épaisse"];

  const tailleIdx = tailleOptions.find((opt) => opt.value === taille)?.idx ?? 1;
  const prixAffiche =
    Array.isArray(prix) && typeof prix[tailleIdx] === "number"
      ? `${prix[tailleIdx].toFixed(2)} €`
      : "Prix indisponible";

  return (
    <AlertDialogContent className="max-w-lg w-full">
      <div className="space-y-4">
        {/* Image pizza */}
        <div className="relative w-full h-52 rounded-md overflow-hidden">
          <Image
            src="/burger.jpg"
            alt="Cannibale"
            fill
            className="object-cover"
          />
        </div>

        {/* Nom, prix, description */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold">Cannibale</h2>
          <p className="text-orange-600 text-xl font-semibold">{prixAffiche}</p>
          <p className="text-muted-foreground">
            Sauce barbecue, mozzarella, poulet rôti, merguez, haché au bœuf goût
            flambé.
          </p>
        </div>

        {/* Taille */}
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

        {/* Pâte */}
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

        {/* Sauce */}
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

        {/* Ingrédients */}
        <div className="space-y-3">
          <h3 className="font-semibold">Ingrédients</h3>
          {[
            { nom: "Haché au bœuf goût flambé", image: "/boeuf.jpg" },
            { nom: "Poulet rôti", image: "/poulet.jpg" },
          ].map((ingr, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border rounded px-3 py-2"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={ingr.image}
                  alt={ingr.nom}
                  width={40}
                  height={40}
                  className="rounded-full h-12 w-12"
                />
                <span>{ingr.nom.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-2">
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
