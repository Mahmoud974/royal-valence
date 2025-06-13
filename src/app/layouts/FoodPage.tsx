import FoodLayout from "./FoodLayout";
import CardFood from "@/components/Card";
import React from "react";

interface FoodPageProps {
  foodType: string;
  title: string;
}

export default async function FoodPage({ foodType, title }: FoodPageProps) {
  const response = await fetch(`${process.env.API_KEY}/resource`);
  const posts = await response.json();

  const allProducts = JSON.parse(posts.body).data || [];

  const filteredProducts = allProducts.filter((item) => item.type === foodType);

  console.log(`${foodType}Only →`, filteredProducts);

  return (
    <FoodLayout title={title}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product, index: number) => (
          <CardFood key={index} {...product} />
        ))}
      </div>
    </FoodLayout>
  );
}
