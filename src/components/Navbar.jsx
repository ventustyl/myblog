"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false); // Menu fermé par défaut
  const [isLoggedIn, setIsLoggedIn] = useState(!!user); // Déterminer l'état de connexion à partir de `user`
  const [userPseudo, setUserPseudo] = useState(user?.pseudo || ""); // Stocke le pseudo utilisateur

  useEffect(() => {
    // Mettre à jour les états si `user` change
    if (user) {
      setIsLoggedIn(true);
      setUserPseudo(user.pseudo);
    } else {
      setIsLoggedIn(false);
      setUserPseudo("");
    }
  }, [user]);

  // Gérer la déconnexion
  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; Path=/;"; // Supprimer le cookie JWT
    setIsLoggedIn(false); // Mettre à jour l'état de connexion
    setUserPseudo(""); // Réinitialiser le pseudo
    setIsOpen(false); // Fermer le menu
  };

  return (
    <header className="w-full bg-white border-b border-b-blue-400 fixed p-4 z-50">
      <nav className="u-main-containe">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link
            className="text-black text-xl font-bold"
            href={"/"}
            onClick={() => setIsOpen(false)}
          >
            📚 My blog
          </Link>

          {/* Burger Menu Button (visible on small screens) */}
          <button
            className="block md:hidden text-black focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Links */}
          <div
            className={`absolute top-16 left-0 w-full bg-white h-screen transform transition-transform duration-1000 outline outline-16 outline-white ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } md:static md:flex md:translate-x-0 md:w-auto md:h-auto`}
          >
            <ul className="flex flex-col gap-y-8 md:flex-row md:items-center md:space-x-4 p-4 md:p-0">
              <Link
                className="mx-2 text-black mr-auto"
                href={"#"}
                onClick={() => setIsOpen(!isOpen)}
              >
                🗂️ Catégories
              </Link>

              <Link
                className="mx-2 text-black"
                href={"/dashboard/creation"}
                onClick={() => setIsOpen(!isOpen)}
              >
                ➕ Ajouter un article
              </Link>

              {isLoggedIn ? (
                <>
                  <Link
                    className="mx-2 text-black"
                    href={"/dashboard/user"}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    👨‍💻 {userPseudo}
                  </Link>
                  <button
                    className="mx-2 text-white w-36 bg-red-500 px-4 text-center py-2 rounded hover:shadow-xl"
                    onClick={handleLogout}
                  >
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link
                    className="mx-2 text-black"
                    href={"/dashboard/user"}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    📑 S'inscrire
                  </Link>
                  <Link
                    className="mx-2 text-white w-36 bg-blue-500 px-4 text-center py-2 rounded hover:shadow-xl"
                    href={"/dashboard/connection"}
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Se connecter
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
