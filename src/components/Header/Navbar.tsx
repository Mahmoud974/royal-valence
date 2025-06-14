"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaRegUserCircle, FaSearch, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const [orderType, setOrderType] = useState("Dine in");
  const [searchTerm, setSearchTerm] = useState("");

  // Pages principale : elles iront dans la barre gris foncé
  const pages = [
    { label: "Home", path: "/" },
    { label: "Pizzas", path: "/pizzas" },
    { label: "Burgers", path: "/burgers" },
    { label: "Tacos", path: "/tacos" },
    { label: "Salades", path: "/salades" },
    { label: "Desserts", path: "/desserts" },
    { label: "Boissons", path: "/boissons" },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white shadow"
    >
      {/* Première ligne : Logo, choix du type de commande, barre de recherche et icônes */}
      <div className="flex justify-between items-center container mx-auto py-4 px-4 gap-4">
        {/* Zone gauche : Logo + Type de commande */}
        <div className="flex items-center gap-5 shrink-0">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-orange-600 whitespace-nowrap">
            <Link href="/">Royal</Link>
          </h1>

          
          <div className="flex flex-wrap justify-center items-center bg-gray-100 rounded-full p-1 max-w-xs">
            {["Dine in", "Take Away", "Delivery"].map((type) => (
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

        {/* Barre de recherche au centre */}
        <div className="relative flex-1 max-w-md mx-4 hidden sm:block     ">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2  text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher des plats ou boissons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 rounded-full  bg-gray-100  border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          {searchTerm && (
            <FaTimes
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={() => setSearchTerm("")}
            />
          )}
        </div>

        {/* Zone droite : icônes */}
        <div className="flex items-center gap-4 shrink-0">
          <Link href="/register" title="Mon compte">
            <FaRegUserCircle className="text-2xl text-orange-600 hover:text-orange-700 transition" />
          </Link>
          <Link href="/favoris" title="Mes favoris">
            <FaHeart className="text-2xl text-orange-600 hover:text-orange-700 transition" />
          </Link>
        </div>
      </div>

      {/* Barre de navigation principale (Home à Boissons) */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-gray-800 text-white text-sm py-2"
      >
        <ul className="flex justify-center gap-6 container mx-auto flex-wrap text-center">
          {pages.map((page) => {
            const isActive =
              page.path === "/" ? pathname === "/" : pathname.startsWith(page.path);

            return (
              <motion.li
                key={page.label}
                whileHover={{ scale: 1.05, color: "#f97316" }}
                transition={{ type: "spring", stiffness: 250 }}
                className="cursor-pointer"
              >
                <Link
                  href={page.path}
                  className={
                    isActive
                      ? "text-orange-400 border-b-2 border-orange-400 pb-1"
                      : ""
                  }
                >
                  {page.label}
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </motion.nav>
  );
}
