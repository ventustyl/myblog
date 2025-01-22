import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT;

export default async function RootLayout({ children }) {
 
    // Récupérer et valider le JWT dans le cookie
    const cookieStore = await cookies();
    const token = await cookieStore.get("token")?.value;
    let user = null;
  
    if (token) {
      try {
        // Valider et décoder le JWT
        user = jwt.verify(token, JWT_SECRET);
        console.log("Utilisateur connecté :", user);
      } catch (err) {
        console.error("JWT invalide ou expiré :", err.message);
      }
    }

  return (
    <html lang="fr" className="h-full">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="flex min-h-full flex-col">
        <Navbar user={user ? { pseudo: user.pseudo } : null}  />
        <main className="grow mt-14 bg-white">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
