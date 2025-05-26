"use server"
import { connectToDB } from "../../utils/db/connectToDB"
import { Post } from "../../models/post"

export async function addPost(formData) {
    const {title, article} = Object.fromEntries(formData)
    try {
        await connectToDB()
        const newPost = new Post({
            title, 
            article
        })
        const savedPost = await newPost.save()
        console.log("post créer et sauvegarder")
        return {success: true, slug: savedPost.slug}
    }
    catch(err){
        console.log("Erreur lors de la creation", err);        
        throw new Error(err.message || "erreur lors de la création")
    }
}