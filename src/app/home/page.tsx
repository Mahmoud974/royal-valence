"use client";
import Image from "next/image";
import Link from "next/link";

export default function HomePromo() {
  return (
    <section className="max-w-6xl mx-auto mt-10 px-4">
      <div className="relative bg-black rounded-2xl overflow-hidden flex flex-col justify-end min-h-[420px] mb-6">
        <Image
          src="/burger.jpg"
          alt="Promo Royal Tacos"
          fill
          sizes=""
          className="object-cover z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
        <div className="relative z-20 p-8 flex flex-col h-full justify-between">
          <div>
            <h2 className="text-white text-5xl font-extrabold mb-2">
              -50%<span className="text-lg align-super">*</span>
            </h2>
            <p className="text-white text-2xl font-bold mb-1">
              sur le 2<sup>e</sup> tacos en livraison
            </p>
            <p className="text-orange-400 font-bold mb-3">Du lundi au jeudi</p>
          </div>
          <div>
            <Link
              href="#"
              className="bg-[#e31b23] hover:bg-[#ff3d49] text-white font-extrabold rounded-full px-7 py-3 text-lg shadow-lg transition"
            >
              Commandez
            </Link>
            <p className="text-xs text-gray-200 mt-2">
              *Voir conditions sur la page dédiée.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative bg-[#22282f] rounded-2xl overflow-hidden min-h-[220px] flex flex-col justify-end">
          <Image
            src="/burger.jpg"
            sizes=""
            alt="Custom Royal Tacos"
            fill
            className="object-cover z-0"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
          <div className="relative z-20 p-6 flex flex-col h-full justify-between">
            <div>
              <h3 className="text-white text-xl font-bold mb-1">Custom</h3>
              <p className="text-gray-200 text-sm mb-2">
                Crée ton tacos sur mesure <br /> Casse la routine, innove !
              </p>
            </div>
            <Link
              href="#"
              className="mt-2 inline-block bg-[#e31b23] hover:bg-[#ff3d49] text-white font-bold rounded-full px-6 py-2 text-sm shadow transition"
            >
              Commandez
            </Link>
          </div>
        </div>

        <div className="relative bg-white rounded-2xl overflow-hidden min-h-[220px] flex flex-col justify-end">
          <Image
            src="/burger.jpg"
            sizes=""
            alt="Recyclage"
            fill
            className="object-cover z-0"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
          <div className="relative z-20 p-6 flex flex-col h-full justify-between">
            <div>
              <h4 className="text-[#e31b23] font-bold text-base mb-2">
                #ÀTOIDEJOUER
              </h4>
              <p className="text-white font-semibold text-sm mb-2">
                Les boîtes à tacos peuvent devenir des boîtes à chaussures !
              </p>
              <p className="text-gray-200 text-xs mb-2">
                Trier, c’est donner une nouvelle vie aux emballages.
              </p>
            </div>
            <Link
              href="#"
              className="bg-[#e31b23] hover:bg-[#ff3d49] text-white font-bold rounded-full px-6 py-2 text-sm shadow transition"
            >
              En savoir plus
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
