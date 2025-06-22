import Banner from "@/components/Banner/Banner";
import Basket from "@/components/Basket/Basket";
import React from "react";

export default function FoodLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Banner />
      <main className="mx-auto container px-4">
        <h1 className="text-2xl sm:text-3xl py-4 font-semibold">{title}</h1>

        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8 space-y-8 lg:space-y-0">
          
          <div className="flex-1 space-y-8">{children}</div>

         
          <div className="lg:sticky lg:top-4 w-full lg:w-[400px]">
            <Basket />
          </div>
        </div>
      </main>
    </>
  );
}
