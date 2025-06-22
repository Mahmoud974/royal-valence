"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { useCardStore } from "@/store/useElementStore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {   ShoppingBasket } from "lucide-react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog";
import CardDialog from "./CardDialog";

interface CardFoodProps {
  nom: string;
  description: string;
  prix: number | number[];
  image: string;
  pates?: string[];
  vegetarien?: boolean;
  id: string;
  type: string;
}

const tailleOptions = [
  { label: "Petit", value: "small", idx: 0 },
  { label: "Medium", value: "medium", idx: 1 },
  { label: "Grand", value: "large", idx: 2 },
];

export default function CardFood({
  nom,
  description,
  prix,
  pates = [],
  vegetarien = false,
  type
}: CardFoodProps) {
  const inputRef = useRef(null);
  const [taille, setTaille] = useState("medium");

  const tailleIdx = tailleOptions.find((opt) => opt.value === taille)?.idx ?? 1;
  const prixArray = Array.isArray(prix) ? prix : [prix];
  // DEBUG : Affichage des infos prix
  console.log('prix reçu:', prix, 'prixArray:', prixArray, 'taille sélectionnée:', taille, 'index utilisé:', tailleIdx, 'prix à cet index:', prixArray[tailleIdx]);
  const prixAffiche =
    prixArray && prixArray.length > tailleIdx && typeof prixArray[tailleIdx] === "number"
      ? `${prixArray[tailleIdx].toFixed(2)} €`
      : `${Number(prixArray[0]).toFixed(2)} €`;

  const { addCard, addBasket } = useCardStore();

  const handleClick = () => {
    const prixValue = prixArray && prixArray.length > tailleIdx && typeof prixArray[tailleIdx] === "number" ? prixArray[tailleIdx] : prixArray[0] ?? 0;
    const newItem = { nom, description, prix: prixValue, pates, type };
    addCard(newItem.nom, newItem.description, newItem.prix, newItem.pates);
    addBasket(newItem);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Card className="cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg w-full border-none hover:bg-slate-50 hover:rotate-1">
          <div className="relative h-58 -mt-7 w-full">
            <Image
              src="/burger.jpg"
              sizes=""
              alt="burger"
              fill
              className="object-cover"
            />
            <Badge className="absolute top-4 right-2 bg-green-700 hover:bg-orange-600">
              {vegetarien ?   "Pizza": "Végétarien"}
            </Badge>
          </div>
          <CardHeader>
            <div className="space-y-1">
             <div className="flex justify-between items-center">
             <CardTitle className="text-lg">{nom}</CardTitle>
             <p className="flex justify-center items-center bg-orange-600 px-2 py-1 text-white text-lg font-semibold rounded">
  {prixAffiche}
</p>

             </div>
             
              <CardDescription className="line-clamp-3 overflow-hidden text-ellipsis -mb-4">
  {description}
</CardDescription>

            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              
          {
            type != "dessert" && type != "salade" && type != "boisson"  &&  "salade" && type != "burger" &&
            <Select defaultValue={taille} onValueChange={setTaille}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Taille" />
            </SelectTrigger>
            <SelectContent>
              {tailleOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label} :{" "}
                  {prixArray && prixArray.length > option.idx && typeof prixArray[option.idx] === "number"
                    ? prixArray[option.idx].toFixed(2)
                    : "N/A"} {" "}
                  €
                </SelectItem>
              ))}
            </SelectContent>
          </Select>          }

              {pates.length > 0 && (
                <Select defaultValue={pates[0]}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Type de pâte" />
                  </SelectTrigger>
                  <SelectContent>
                    {pates.map((pate, idx) => (
                      <SelectItem key={idx} value={pate}>
                        {pate}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}

              <div className="flex justify-between gap-2">
              <div className="flex items-center gap-2    rounded-full">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full cursor-pointer bg-orange-600 border-none text-white"
                  >
                    −
                  </Button>
                  <span className="text-orange-600 font-bold">1</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full cursor-pointer bg-orange-600 border-none text-white"
                  >
                    +
                  </Button>
                </div>
               
                <Button
                  ref={inputRef}
                  onClick={handleClick}
                  className="rounded-full w-9.5 h-9.5 cursor-pointer bg-green-700 border-none text-white"
                >
                  <ShoppingBasket  className=" "/>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogOverlay   />
        <CardDialog />
      </AlertDialogPortal>
    </AlertDialog>
  );
}
