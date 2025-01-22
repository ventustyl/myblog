import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState) {
    console.log("Connection déjà faites à la base", mongoose.connection.name);
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO);
    console.log(" Connection à la base :", mongoose.connection.name);
  } catch (err) {
    throw new Error("Erreur de connection à la base de donnée", err);
  }
}
