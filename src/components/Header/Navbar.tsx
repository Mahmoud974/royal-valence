"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaHeart, FaRegUserCircle, FaSearch, FaTimes } from "react-icons/fa";

const categories = [
  { label: "Home", path: "/", image: "home.png" },
  { label: "Offres", path: "/offres", image: "offres.png" },
  { label: "Burgers", path: "/burgers", image: "burgers.png" },
  { label: "Tacos", path: "/tacos", image: "tacos.png" },
  { label: "Pizzas", path: "/pizzas", image: "pizzas.png" },
  { label: "Salades", path: "/salades", image: "salades.png" },
  { label: "Desserts", path: "/desserts", image: "desserts.png" },
  { label: "Boissons", path: "/boissons", image: "boissons.png" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [orderType, setOrderType] = useState("Dine in");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white shadow-sm"
    >
      {/* Ligne 1 : logo, type de commande, recherche, icônes */}
      <div className="flex justify-between items-center container mx-auto py-4 px-4 gap-4">
        {/* Logo + type de commande */}
        <div className="flex items-center gap-5 shrink-0">
          <h1 className="text-2xl font-bold text-orange-600 whitespace-nowrap">
            <Link href="/">Royal</Link>
          </h1>

          <div className="flex flex-wrap justify-center items-center bg-gray-100 rounded-full p-1 max-w-xs">
            {[
              "Dine in",
              "Take Away",
              "Delivery",
            ].map((type) => (
              <button
                key={type}
                className={`px-4 py-2 cursor-pointer text-sm font-medium rounded-full transition-colors duration-200 m-1 ${
                  orderType === type
                    ? "bg-orange-600 text-white"
                    : "text-gray-500 hover:bg-gray-200"
                }`}
                onClick={() => setOrderType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Barre de recherche */}
        <div className="relative flex-1 max-w-md mx-4 hidden sm:block">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher des plats ou boissons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {searchTerm && (
            <FaTimes
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={() => setSearchTerm("")}
            />
          )}
        </div>

        {/* Icônes profil + favoris */}
        <div className="flex items-center gap-4 shrink-0">
          <Link href="/register" title="Mon compte">
            <FaRegUserCircle className="text-2xl text-orange-600 hover:text-orange-700 transition" />
          </Link>
          <Link href="/favoris" title="Mes favoris">
            <FaHeart className="text-2xl text-orange-600 hover:text-orange-700 transition" />
          </Link>
        </div>
      </div>

      {/* Ligne 2 : catégories */}
      <div className="flex justify-center py-4 px-4 overflow-x-auto scrollbar-hide bg-gray-50">
        <ul className="flex space-x-8 items-center justify-center w-max">
          {categories.map((cat) => {
            const isActive =
              cat.path === "/" ? pathname === "/" : pathname.startsWith(cat.path);

            return (
              <li key={cat.label} className="flex flex-col items-center text-xs">
                <Link
                  href={cat.path}
                  className={`rounded-2xl overflow-hidden w-[96px] h-[96px] flex items-center justify-center ${
                    isActive ? "ring-4 ring-orange-500" : "shadow-md"
                  } transition-transform hover:scale-105`}
                >
                  <Image
                    src={`/ImgMenu/${cat.image}`}
                    alt={cat.label}
                    width={192}
                    height={192}
                    sizes="(max-width: 768px) 25vw, 96px"
                    className="object-cover w-full h-full"
                    priority
                  />
                </Link>
                <span
                  className={`mt-2 text-sm ${
                    isActive ? "text-orange-600 font-semibold" : "text-gray-800"
                  }`}
                >
                  {isActive && "✓ "}
                  {cat.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.nav>
  );
}
