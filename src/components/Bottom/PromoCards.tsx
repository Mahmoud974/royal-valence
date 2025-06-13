"use client";
import Image from "next/image";

const promos = [
  {
    title: "Carte Edenred Ticket Restaurant",
    img: "/helpBloc/1.jpg",
  },
  {
    title: "Meilleure enseigne de pizza",
    subtitle: "2024 - 2025",
    description: "pour la 8e année consécutive",
    img: "/helpBloc/2.jpg",
  },
  {
    title: "Le nutri-score de nos produits",
    img: "/helpBloc/3.jpg",
  },
  {
    title: "En exclu sur l'app Royal Tacos",
    description: "-10% sur les menus",
    img: "/helpBloc/4.jpg",
  },
];

export default function PromoCards() {
  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {promos.map((promo, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="w-full aspect-square bg-gray-600 flex items-center justify-center overflow-hidden rounded-lg shadow">
              {promo.img ? (
                <Image
                  src={promo.img}
                  alt={promo.title}
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-white text-lg text-center px-4">
                  {promo.title}
                </span>
              )}
            </div>

            <div className="w-full mt-4 flex flex-col items-center text-center">
              <h3 className="text-lg font-semibold">{promo.title}</h3>
              {promo.subtitle && (
                <p className="text-sm text-gray-500">{promo.subtitle}</p>
              )}
              {promo.description && (
                <p className="text-sm text-gray-700">{promo.description}</p>
              )}

              <button className="mt-3 w-full bg-gray-800 text-white py-2 text-sm rounded-md hover:bg-gray-700 transition">
                VOIR PLUS
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
