"use client";
import React, { useState } from "react";
import Image from "next/image";
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
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
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
  const [taille, setTaille] = useState("medium");

  const tailleIdx = tailleOptions.find((opt) => opt.value === taille)?.idx ?? 1;

  // Affiche le prix selon la taille sélectionnée, sinon affiche "Prix indisponible"
  const prixAffiche =
    Array.isArray(prix) && typeof prix[tailleIdx] === "number"
      ? `${prix[tailleIdx].toFixed(2)} €`
      : "Prix indisponible";

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Card className="cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg w-full border-none">
          <div className="relative h-58 -mt-7 w-full">
            <Image
              src="/burger.jpg"
              alt="burger"
              alt="oko"
              fill
              className="object-cover"
            />
            <Badge className="absolute top-4 right-2 bg-orange-500 hover:bg-orange-600">
              {vegetarien ? "Végétarien" : "Pizza"}
            </Badge>
          </div>
          <CardHeader>
            <div className="flex flex-col justify-between items-start">
              <div className="space-y-1">
                <CardTitle className="text-xl">{nom}</CardTitle>
                <div className="text-xl font-bold text-orange-500">
                  {prixAffiche}
                </div>
                <CardDescription>{description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {/* Taille */}
              <div className="flex items-center gap-2">
                <Select defaultValue={taille} onValueChange={setTaille}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Taille" />
                  </SelectTrigger>
                  <SelectContent>
                    {tailleOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                        {Array.isArray(prix) &&
                        typeof prix[option.idx] === "number"
                          ? ` : ${prix[option.idx].toFixed(2)} €`
                          : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Type de pâte, si défini */}
              {pates.length > 0 && (
                <div className="flex items-center gap-2">
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
                </div>
              )}

              {/* Quantité & actions */}
              <div className="flex items-center justify-end gap-2">
                <Select defaultValue="1">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Qté" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <SelectItem key={n} value={n.toString()}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button className="bg-orange-600 cursor-pointer hover:bg-green-600">
                  <Pencil />
                </Button>
                <Button className="cursor-pointer hover:bg-orange-600">
                  <ShoppingBasket />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </AlertDialogTrigger>
      <CardDialog />
    </AlertDialog>
  );
}
