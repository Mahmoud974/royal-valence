import FoodLayout from "../layouts/FoodLayout";
import CardFood from "@/components/Card";
import React from "react";

export default async function TacosPage() {
  const response = await fetch(`${process.env.API_KEY}/resource`);
  const posts = await response.json();

  const allProducts = JSON.parse(posts.body).data || [];

  const tacosOnly = allProducts.filter((item) => item.type === "salade");

  console.log("tacosOnly →", tacosOnly);

  return (
    <FoodLayout title="Les Tacos">
      <div className="grid grid-cols-4 gap-2 flex-wrap">
        {tacosOnly.map((taco, index: number) => (
          <CardFood key={index} {...taco} />
        ))}
      </div>
    </FoodLayout>
  );
}
