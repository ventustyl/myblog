import { Post } from "../../models/post";
import { connectToDB } from "../../utils/db/connectToDB";

export async function getPost(slug) {
  try {
    await connectToDB();

    const post = await Post.findOne({ slug });

    return post

  } catch (err) {
    console.log("erreur lors de la recuperation de l'article : ", err);
    throw new Error(err.message);
  }
}


export async function getPosts() {
  try {
    await connectToDB()
    const posts = await Post.find()

    return posts
  } catch(err) {
    console.log("erreur lors de la recuperation des articles : ", err);
  }
}