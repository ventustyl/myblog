import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="fixed w-full bg-black border-b top-0 text-white">
      <div className="max-w-6xl mw-auto flex py-4 px-12">
        <Link href="/" className="mr-3">📚 My Blog</Link>
        <Link href="/" className="mr-auto">🔎 Catégories</Link>
        <Link href="/" className="mx-3">📝 Ajouter un Article</Link>
      </div>
    </nav>
  );
}
