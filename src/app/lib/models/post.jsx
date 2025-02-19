import mongoose from "mongoose";
import slugify from "slugify";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    article: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { Timestamps: true }
);

postSchema.pre("save", async function (next) {
  if (!this.slug) {
    let slugCandidate = slugify(this.title, { lower: true, strict: true });
    let slugExist = await mongoose.models.Post.findOne({ slug: slugCandidate });
    let counter = 1;
    while (slugExist) {
      slugCandidate = `${slugCandidate}-${counter}`;
      slugExist = await mongoose.models.Post.findOne({ slug: slugCandidate });
      counter++;
    }
    this.slug = slugCandidate;
    console.log(" Slug crée", slugCandidate);
  }
  next();
});

export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);
