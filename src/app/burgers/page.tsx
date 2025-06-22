import FoodLayout from "../layouts/FoodLayout";
import CardFood from "@/components/Card";
import React from "react";

export default async function BurgersPage() {
  const data = await fetch(process.env.API_KEY! + "/resource");
  const posts = await data.json();
  const parsed = JSON.parse(posts.body).data;

  return (
    <FoodLayout title="Les Burgers 🍔 ">
      <div className="grid grid-cols-4 gap-2  flex-wrap">
        {parsed.map((burger, index: number) => (
          <CardFood key={index} {...burger} />
        ))}
      </div>
    </FoodLayout>
  );
}
