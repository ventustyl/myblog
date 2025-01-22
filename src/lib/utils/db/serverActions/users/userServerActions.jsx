"use server";

import { connectDB } from "../../connect";
import { User } from "@/lib/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

// Clé secrète pour JWT (doit être configurée dans les variables d'environnement)
const JWT_SECRET = process.env.JWT || "votre_secret_developpement";
console.log(JWT_SECRET);

// Définir un cookie JWT
function setTokenCookie(token) {
  const cookieStore = cookies();
  cookieStore.set({
    name: "token",
    value: token,
    httpOnly: true,
    path: "/",
    maxAge: 2592000, // 30 jours
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
}

export async function addUser(formData) {
  const { pseudo, password, email } = Object.fromEntries(formData);
  const errors = [];

  // Validation des données sans retour immédiat
  if (!pseudo || typeof pseudo !== "string" || pseudo.trim().length < 5) {
    errors.push("Le pseudo doit contenir au moins 5 caractères.");
  }

  if (!password || typeof password !== "string" || password.trim().length < 8) {
    errors.push("Le mot de passe doit contenir au moins 8 caractères.");
  }

  if (
    !email ||
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    errors.push("Veuillez fournir une adresse e-mail valide.");
  }

  // Si des erreurs de validation sont présentes, on les renvoie toutes
  if (errors.length > 0) {
    return {
      success: false,
      error: errors[0], // Pour la compatibilité avec le code existant
      errors: errors, // Tableau complet des erreurs
    };
  }

  try {
    await connectDB();

    // Vérification du pseudo existant
    const existingUser = await User.findOne({ pseudo });
    if (existingUser) {
      errors.push("Le pseudo est déjà utilisé.");
      return {
        success: false,
        error: errors[0],
        errors: errors,
      };
    }

    // Vérification de l'email existant
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      errors.push("Cette adresse e-mail est déjà utilisée.");
      return {
        success: false,
        error: errors[0],
        errors: errors,
      };
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création d'un nouvel utilisateur
    const newUser = new User({
      pseudo,
      password: hashedPassword,
      email,
    });

    // Sauvegarde dans la base de données
    await newUser.save();

    // Génération du token JWT
    const token = jwt.sign(
      { id: newUser._id, pseudo: newUser.pseudo },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Envoi du token dans un cookie
    setTokenCookie(token);

    return {
      success: true,
      message: "Utilisateur créé avec succès !",
    };
  } catch (err) {
    console.error("Erreur lors de la création de l'utilisateur :", err.message);
    return {
      success: false,
      error: "Erreur lors de la création de l'utilisateur.",
      errors: ["Erreur lors de la création de l'utilisateur."],
    };
  }
}

export async function connectUser(formData) {
  const { pseudo, password } = Object.fromEntries(formData);
  const errors = [];

  // Validation des données
  if (!pseudo?.trim()) {
    errors.push("Le pseudo est requis.");
  }
  if (!password?.trim()) {
    errors.push("Le mot de passe est requis.");
  }

  // Retour si des erreurs sont détectées
  if (errors.length > 0) {
    return {
      success: false,
      error: errors[0],
      errors,
    };
  }

  try {
    // Connexion à la base de données
    await connectDB();

    // Recherche de l'utilisateur
    const user = await User.findOne({ pseudo });

    if (!user) {
      errors.push("Identifiants incorrects.");
      return {
        success: false,
        error: errors[0],
        errors,
      };
    }

    // Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      errors.push("Mot de passe incorrects.");
      return {
        success: false,
        error: errors[0],
        errors,
      };
    }

    // Génération du token JWT
    const token = jwt.sign({ id: user._id, pseudo: user.pseudo }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Envoi du token dans un cookie
    setTokenCookie(token);

    // Retour des informations de l'utilisateur
    return {
      success: true,
      message: "Connexion réussie !",
      user: {
        id: user._id.toString(), // Conversion de l'ID en chaîne
        pseudo: user.pseudo, // Retourne uniquement le pseudo
      },
    };
  } catch (err) {
    console.error("Erreur lors de la connexion :", err.message);
    return {
      success: false,
      error: "Erreur lors de la connexion.",
      errors: ["Erreur lors de la connexion."],
    };
  }
}

// Fonction pour déconnecter un utilisateur
export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.set({
    name: "token",
    value: "",
    httpOnly: true,
    path: "/",
    maxAge: 0, // Expiration immédiate
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return { success: true, message: "Déconnexion réussie." };
}
