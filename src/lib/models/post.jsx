import mongoose from "mongoose";
import slugify from "slugify";

const postSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

postSchema.pre("save", async function (next) {
  if (!this.slug) {
    // Génération initiale du slug
    let slugNew = slugify(this.titre, { lower: true, strict: true });
    
    // Vérifier si un slug identique existe déjà
    let slugExist = await mongoose.models.Post.findOne({ slug: slugNew });
    
    let counter = 1;
    // Ajouter un suffixe numérique si le slug existe
    while (slugExist) {
      slugNew = `${slugify(this.titre, { lower: true, strict: true })}-${counter}`;
      slugExist = await mongoose.models.Post.findOne({ slug: slugNew });
      counter++;
    }

    this.slug = slugNew;
  }
  next();
});

export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);