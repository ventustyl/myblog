"use server";
import { connectDB } from "../../connect";
import { Post } from "@/lib/models/post";

export async function addPost(formData) {
  const { titre, message } = Object.fromEntries(formData);

  try {
    await connectDB();
    const newPost = new Post({
      titre,
      message,
    });
    const savedPost = await newPost.save();
    console.log("Article sauvegardé avec succès");
    return { sucess: true, slug: savedPost.slug || savedPost._id };
  } catch (err) {
    console.error("Erreur pendant la création de l'article :", err.message);
    return {
      success: false,
      error: "Une erreur est survenue lors de la sauvegarde de l'article.",
    };
  }
}
