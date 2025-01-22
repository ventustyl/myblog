"use client";

import React from "react";
import { addPost } from "@/lib/utils/db/serverActions/blog/postServerActions";

function page() {
 async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    const result = await addPost(formData)

    console.log(result);

  
    
  }

  return (
    <main className="u-padding-content-container u-main-container">
      <h1 className="t-main-title">✒️ Ecrire votre article</h1>
      <form className="py-6" onSubmit={handleSubmit}>
        <label className="f-label mb-2" htmlFor="titre">
          🔵 Votre titre
        </label>
        <input
          className="shadow border rounded w-full p-2 mt-2 mb-7 focus:border-b-blue-400 focus:border-b focus:outline-none"
          type="text"
          name="titre"
          id="titre"
          placeholder="Merci de mettre votre titre"
          required
        />

        <div className="flex flex-col mt-2 mb-6  ">
          <a
            href="https://www.markdownguide.org/cheat-sheet/"
            target="_blank"
            className="text-blue-500"
          >
            🔥 Markdown sheet cheat{" "}
          </a>
          <a
            href="https://venturino.site/markdown/"
            target="_blank"
            className="text-blue-500"
          >
            🔥 Convertisseur d'Html en Markdown
          </a>
        </div>
        <label className="f-label mb-2" htmlFor="message">
          🔵 Votre texte
        </label>
        <textarea
          className="shadow border rounded w-full p-2 mt-2 mb-7 h-32 focus:border-b-blue-400 focus:border-b focus:outline-none"
          type="text"
          name="message"
          id="message"
          placeholder="Ici votre contenu"
          required
        />
        <button className="m-w-44 border shadow text-blue-500 transition duration-300 py-2 px-8 rounded hover:shadow-md">
          Soumettre
        </button>
      </form>
    </main>
  );
}

export default page;
