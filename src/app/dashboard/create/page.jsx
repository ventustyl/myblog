"use client";
import Link from "next/link";
import React from "react";
import { addPost } from "@/app/lib/serverActions/blog/postServerAction";

export default function page() {

    async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target)
  
    
//  for (const [key, value] of formData.entries()) {
//     console.log(key,value);
    
//  }
    const result = await addPost(formData)
    console.log(result);
    
  }

  return (
    <div className="u-main-container u-padding-content-container ">
      <h1 className="t-main-title">➕ Créer un article</h1>
      <form onSubmit={handleSubmit} className="pt-6">
        <label htmlFor="title" className="f-label">
          Titre de l'article
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="shadow  rounded w-full p-2 mb-7 focus:outline-blue-100 "
          placeholder="Votre titre ici"
          required
        ></input>
        <div className="flex flex-col my-2">
          <Link
            href="https://www.markdownguide.org/cheat-sheet/"
            target="_blank"
            className="hover:text-blue-300"
          >
            🔥 Markdown Cheat Sheet
          </Link>
          <Link
            href="https://venturino.site/markdown/"
            target="_blank"
            className="hover:text-blue-300"
          >
            🔥 Convertisseur HTML/Markdown
          </Link>
        </div>
        <label htmlFor="article" className="f-label">
          Votre article en markdown
        </label>
        <textarea name="article" id="article" className="min-h-44  shadow appearance-none rounded p-2 w-full focus:outline-blue-100" required></textarea>
        <button className="text-white w-full bg-gradient-to-r from-indigo-600 to-blue-500 rounded py-3 px-4 my-4 hover:from-indigo-700 hover:to-blue-600 duration-700 hover:cursor-pointer transition">
  Soumettre
</button>

      </form>
    </div>
  );
}
