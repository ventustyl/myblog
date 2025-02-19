import mongoose from "mongoose";

export async function connectToDB() {
  if (mongoose.connection.readyState) {
    console.log(
      "Déjà connecté à la base de données :",
      mongoose.connection.name
    );
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO);
    console.log(
      "Connexion à la base de données reussi ",
      mongoose.connection.name
    );
  } catch (err) {
    throw new Error("Connextion échouée: ", err);
  }
}
