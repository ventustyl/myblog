"use client";

import React, { useState } from "react";
import { addUser } from "@/lib/utils/db/serverActions/users/userServerActions";
import Link from "next/link";

function Page() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [mail, setMail] = useState("");
  const [response, setResult] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const response = await addUser(formData);

    console.log(response.errors);
    

    // for (var pair of formData.entries())
    //   {
    //    console.log(pair[0]+ ', '+ pair[1]); 
    //   }



    setResult(response);
    if (response.success) {
      setName("");
      setPass("");
      setMail("");
    }
  }

  // Fonction pour basculer la visibilité du mot de passe
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <main className="u-padding-content-container u-main-container">
      <h1 className="t-main-title">🚀 Créer un compte</h1>
      <form className="py-6" onSubmit={handleSubmit}>
        {/* Pseudo */}
        <label className="f-label mb-2" htmlFor="pseudo">
          🔵 Votre pseudo
        </label>
        <input
          className="shadow border rounded w-full p-2 mt-2 mb-7 focus:border-b-blue-400 focus:border-b focus:outline-none"
          type="text"
          name="pseudo"
          id="pseudo"
          placeholder="Merci de mettre votre pseudo"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Mot de passe */}
        <label className="f-label mb-2" htmlFor="password">
          🔵 Votre mot de passe
        </label>
        <div className="relative">
          <input
            className="shadow border rounded w-full p-2 mt-2 mb-7 focus:border-b-blue-400 focus:border-b focus:outline-none"
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Ici votre mot de passe"
            required
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/3 transition duration-1000 pt-2 transform -translate-y-1/2 text-3xl text-blue-600 focus:outline-none"
          >
            {showPassword ? "🤐" : "😵"}
          </button>
        </div>
        <label htmlFor="emil">🔵 Votre Email</label>
        <input
          className="shadow border rounded w-full p-2 mt-2 mb-7 focus:border-b-blue-400 focus:border-b focus:outline-none"
          type="email"
          name="email"
          id="email"
          placeholder="Ici votre mot adresse mail"
          required
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />

        {response.success ? (
          <p className="text-blue-400 text-center py-2">{response.message}</p>
        ) : (
          Array.isArray(response.errors) &&
          response.errors.map((error, index) => (
            <p key={index} className="text-red-400 text-center py-2">{error}</p>
          ))
        )}
        <button
          type="submit"
          className="block m-w-16 border shadow text-blue-500 transition duration-300 py-2 px-8 rounded hover:shadow-md m-auto  "
        >
          Soumettre
        </button>
      </form>
      <div className="flex justify-center items-center">
        <hr className="border border-x-1 border-blue-400 border-solid w-96 px-6" />
        <p className="px-6">Ou</p>
        <hr className="border border-x-1 border-blue-400 border-solid w-96 px-6" />
      </div>
      <Link
        className="block w-52 text-center mt-6 border shadow text-blue-500 transition duration-300 py-2 px-8 rounded hover:shadow-md m-auto "
        href={"/connection/"}
      >
        Connectez-vous
      </Link>
    </main>
  );
}

export default Page;
