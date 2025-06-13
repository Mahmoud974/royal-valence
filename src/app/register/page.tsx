"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Mail, UserPlus } from "lucide-react";
import { useState } from "react";
import AWS from "aws-sdk";

// ✅ Configuration AWS avec variables publiques uniquement
AWS.config.update({
  region: process.env.NEXT_PUBLIC_COGNITO_REGION,
  accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
});

const cognito = new AWS.CognitoIdentityServiceProvider();

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    const params = {
      ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: "email", Value: email },
        { Name: "name", Value: fullName },
      ],
    };

    try {
      await cognito.signUp(params).promise();
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row text-white">
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 md:px-24 py-16 space-y-6">
        <Link href="/" className="text-sm mb-2 text-[#2a2b2c] hover:underline">
          ← Retour
        </Link>
        <h1 className="text-3xl font-bold flex items-center text-black gap-2">
          <UserPlus size={28} />
          Créer un compte
        </h1>
        <p className="text-black text-sm">
          Les champs obligatoires sont marqués d&apos;un astérisque*
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="* Nom complet"
            className="w-full px-4 py-3 rounded-md bg-[#2a2b2c] text-white"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="* Adresse email"
            className="w-full px-4 py-3 rounded-md bg-[#2a2b2c] text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="* Mot de passe"
            className="w-full px-4 py-3 rounded-md bg-[#2a2b2c] text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && (
            <p className="text-green-500 text-sm">
              Compte créé avec succès ! Vérifie ton email.
            </p>
          )}

          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-500 transition px-6 py-3 rounded-full w-fit font-semibold mt-4"
          >
            {`S'inscrire`}
          </button>
        </form>

        <div className="text-black text-sm">
          Vous avez déjà un compte ?{" "}
          <Link href="/login" className="text-green-400 hover:underline">
            Se connecter
          </Link>
        </div>

        <div className="mt-8 space-y-4">
          <p className="text-center text-gray-500 text-sm">
            Ou inscrivez-vous avec
          </p>
          <div className="flex gap-4">
            <button className="flex items-center text-black justify-center gap-3 px-4 py-2 w-full border border-gray-600 rounded-md hover:bg-[#2a2a2a] transition">
              <Mail size={20} />
              <span>Google</span>
            </button>

            <button className="flex items-center justify-center gap-3 px-4 py-2 w-full border border-blue-600 rounded-md hover:bg-[#2a2a2a] transition">
              <Facebook size={20} className="text-blue-500" />
              <span className="text-blue-500">Facebook</span>
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:block w-1/2 relative">
        <Image
          src="/tacos.png"
          alt="Illustration d'inscription"
          fill
          className="object-cover"
        />
      </div>
    </main>
  );
}
