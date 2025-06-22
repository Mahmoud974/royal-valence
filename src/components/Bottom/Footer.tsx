import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#0f1f1c] text-white text-sm pt-12 pb-6  ">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top : Logo + Liens */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
          {/* Logo */}
          <div className="col-span-2 md:col-span-1 flex items-start">
            <Image
              src="/logo-white.png"
              alt="Royal Tacos"
              width={60}
              height={60}
            />
          </div>

          {/* À propos */}
          <div>
            <h3 className="font-bold mb-4">À propos</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="#">Royal Tacos Valence</Link>
              </li>
              <li>
                <Link href="#">Nos restaurants</Link>
              </li>
              <li>
                <Link href="#">Communiqués</Link>
              </li>
              <li>
                <Link href="#">Nos engagements</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/delivers">Service Client</Link>
              </li>
              <li>
                <Link href="#">Recrutement</Link>
              </li>
              <li>
                <Link href="#">Franchise</Link>
              </li>
              <li>
                <Link href="/delivers">Livraison</Link>
              </li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="font-bold mb-4">Légal</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="#">Données personnelles</Link>
              </li>
              <li>
                <Link href="#">Conditions de vente</Link>
              </li>
              <li>
                <Link href="#">Cookies</Link>
              </li>
            </ul>
          </div>

          {/* Paiement */}
          <div>
  <h3 className="font-bold mb-4">Paiements acceptés</h3>
  <div className="flex flex-wrap gap-3 items-center">
    <Image
      src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
      alt="Visa"
      width={70}
      height={25}
    />
    <Image
      src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
      alt="Mastercard"
      width={50}
      height={25}
    />
    <Image
      src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
      alt="Paypal"
      width={90}
      height={35}
    />
   
  </div>
</div>

        </div>

        {/* Milieu : Réseaux + App mobile */}
        <div className="border-t border-gray-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          {/* Réseaux */}
          <div className="flex gap-4 text-xl text-gray-300">
            {["facebook-f", "instagram", "tiktok", "twitter", "youtube"].map(
              (icon) => (
                <Link
                  key={icon}
                  href="#"
                  className="hover:text-orange-400 transition"
                >
                  <i className={`fab fa-${icon}`} />
                </Link>
              )
            )}
          </div>

          {/* Applications mobiles */}
          <div className="text-center md:text-right">
            <p className="font-semibold mb-2">
              Téléchargez notre application !
            </p>
           

<div className="flex gap-2 justify-center md:justify-end">
  <Image
     src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
    alt="App Store"
    width={120}
    height={40}
  />
  <Image
    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
    alt="Google Play"
    width={120}
    height={40}
  />
</div>

          </div>
        </div>

        <div className="text-center text-gray-500 text-xs space-y-2">
          <p>
            © Royal Tacos Valence {new Date().getFullYear()} – Tous droits
            réservés
          </p>

          <p>
            Pour votre santé, mangez au moins 5 fruits et légumes par jour –{" "}
            <Link
              href="https://www.mangerbouger.fr"
              className="underline hover:text-orange-400"
            >
              www.mangerbouger.fr
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
