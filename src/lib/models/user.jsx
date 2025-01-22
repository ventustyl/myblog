import mongoose from "mongoose";
import bcrypt from "bcryptjs";

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      unique: true,
      minlength: 5, // Ajout d'une validation minimale
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // Ajout d'une validation minimale
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
  },
  { timestamps: true }
);

// Middleware pour hacher le mot de passe avant la sauvegarde
userSchema.pre("save", async function (next) {
  try {
    // Vérifie si le mot de passe est modifié ou nouveau
    if (this.isModified("password")) {
      const saltRounds = 10;
      this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
  } catch (err) {
    next(err); // Passe l'erreur au gestionnaire
  }
});

// Méthode pour comparer un mot de passe brut avec le mot de passe haché
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
