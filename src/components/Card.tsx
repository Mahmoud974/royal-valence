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
import { Pencil, ShoppingBasket } from "lucide-react";
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
  prix: number[];
  image: string;
  pates?: string[];
  vegetarien?: boolean;
  id: string;
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
}: CardFoodProps) {
  const inputRef = useRef(null);
  const [taille, setTaille] = useState("medium");

  const tailleIdx = tailleOptions.find((opt) => opt.value === taille)?.idx ?? 1;
  const prixAffiche =
    prix && prix.length > tailleIdx && typeof prix[tailleIdx] === "number"
      ? `${prix[tailleIdx].toFixed(2)} €`
      : "Prix indisponible";

  const { addCard, addBasket } = useCardStore();

  const handleClick = () => {
    const newItem = { nom, description, prix: prix[tailleIdx], pates };
    addCard(newItem.nom, newItem.description, newItem.prix, newItem.pates);
    addBasket(newItem);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Card className="cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg w-full border-none">
          <div className="relative h-58 -mt-7 w-full">
            <Image
              src="/burger.jpg"
              sizes=""
              alt="burger"
              fill
              className="object-cover"
            />
            <Badge className="absolute top-4 right-2 bg-orange-500 hover:bg-orange-600">
              {vegetarien ? "Végétarien" : "Pizza"}
            </Badge>
          </div>
          <CardHeader>
            <div className="space-y-1">
              <CardTitle className="text-xl">{nom}</CardTitle>
              <div className="text-xl font-bold text-orange-500">
                {prixAffiche}
              </div>
              <CardDescription>{description}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <Select defaultValue={taille} onValueChange={setTaille}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Taille" />
                </SelectTrigger>
                <SelectContent>
                  {tailleOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label} :{" "}
                      {prix && prix.length > option.idx && typeof prix[option.idx] === "number"
                        ? prix[option.idx].toFixed(2)
                        : "N/A"}{" "}
                      €
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

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

              <div className="flex justify-end gap-2">
                <Button className="bg-orange-600 hover:bg-green-600">
                  <Pencil />
                </Button>
                <Button
                  ref={inputRef}
                  onClick={handleClick}
                  className="hover:bg-orange-600"
                >
                  <ShoppingBasket />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogOverlay className="fixed inset-0 bg-black/50" />
        <CardDialog />
      </AlertDialogPortal>
    </AlertDialog>
  );
}
