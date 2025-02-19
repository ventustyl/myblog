import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-black border-b top-0 text-white">
      <div className="u-main-container flex py-4 px-12 sm:px-0 sm:w-full">
        <Link href="/" className="mr-3">📚 My Blog</Link>
        <Link href="/" className="mr-auto">🔎 Catégories</Link>
        <Link href="/dashboard/create" className="mx-3">📝 Ajouter un Article</Link>
      </div>
    </nav>
  );
}
