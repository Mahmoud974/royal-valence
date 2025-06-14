"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaRegUserCircle } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const [orderType, setOrderType] = useState("Dine in");

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
      <div className="flex justify-between items-center container mx-auto py-4 px-4">
        <div className="flex items-center gap-5">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-orange-600">
            <Link href="/">Royal</Link>
          </h1>

          {/* Choix Dine in / Take Away / Delivery */}
          <div className="flex flex-wrap justify-center items-center bg-gray-100 rounded-full p-1 w-full max-w-xs mx-auto">
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

          {/* Navigation principale */}
          <ul className="flex gap-6 text-sm font-medium text-gray-700 ml-6">
            {pages.map((page) => {
              const isActive =
                page.path === "/"
                  ? pathname === "/"
                  : pathname.startsWith(page.path);

              return (
                <motion.li
                  key={page.label}
                  whileHover={{ scale: 1.1, color: "#ea580c" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={page.path}
                    className={
                      isActive
                        ? "text-orange-600 border-b-2 border-orange-600 pb-1"
                        : ""
                    }
                  >
                    {page.label}
                  </Link>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Icons à droite */}
        <div className="flex items-center gap-4">
          <Link href="/register" title="Mon compte">
            <FaRegUserCircle className="text-2xl text-orange-600 hover:text-orange-700 transition" />
          </Link>
          <Link href="/favoris" title="Mes favoris">
            <FaHeart className="text-2xl text-orange-600 hover:text-orange-700 transition" />
          </Link>
        </div>
      </div>

      {/* Sous-catégories */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-gray-800 text-white text-xs py-2"
      >
        <ul className="flex justify-center gap-6 container mx-auto flex-wrap text-center">
          {[
            "BESTSELLERS",
            "NOUVEAUTÉS",
            "LES ICONIQUES",
            "LES CARNIVORES",
            "LES FROMAGES ADDICTS",
            "LES GRANDS CLASSIQUES",
            "CRÉEZ VOTRE PIZZA",
          ].map((item) => (
            <motion.li
              key={item}
              whileHover={{ scale: 1.05, color: "#f97316" }}
              transition={{ type: "spring", stiffness: 250 }}
              className="cursor-pointer"
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.nav>
  );
}
