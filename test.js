const bcrypt = require("bcryptjs");

async function testHashing() {
  const password = "Fcilteam83!";
  const saltRounds = 10;

  // Génération d'un nouveau hash
  const newHashedPassword = await bcrypt.hash(password, saltRounds);
  console.log("Nouveau hash généré :", newHashedPassword);

  // Comparaison avec le nouveau hash
  const isValid = await bcrypt.compare(password, newHashedPassword);
  console.log("Validation avec nouveau hash :", isValid);
}

testHashing();