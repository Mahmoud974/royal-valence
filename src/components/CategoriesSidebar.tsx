"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const categories = [
  { label: "Burgers", path: "/burgers", image: "burgers.png" },
  { label: "Tacos", path: "/tacos", image: "tacos.png" },
  { label: "Desserts", path: "/desserts", image: "desserts.png" },
  { label: "Pizzas", path: "/pizzas", image: "pizzas.png" },
  { label: "Salades", path: "/salades", image: "salades.png" },
  { label: "Boissons", path: "/boissons", image: "boissons.png" },
];

export default function CategoriesSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col items-center w-24 bg-white py-6 shadow-md">
      {categories.map((cat) => {
        const isActive =
          cat.path === "/" ? pathname === "/" : pathname.startsWith(cat.path);

        return (
          <Link key={cat.label} href={cat.path} className="mb-6 flex flex-col items-center group">
            <div
              className={`w-14 h-14 rounded-full overflow-hidden shadow-md ${
                isActive ? "ring-4 ring-orange-500" : ""
              } transition`}
            >
              <Image
                src={`/ImgMenu/${cat.image}`}
                alt={cat.label}
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>
            <span
              className={`mt-2 text-xs font-medium text-center ${
                isActive ? "text-orange-600" : "text-gray-700"
              }`}
            >
              {cat.label}
            </span>
          </Link>
        );
      })}
    </aside>
  );
}
