import parser from "./parser.js";
import "./dotenv.js";
import { pool } from "./database.js";

const seedPkmTable = async () => {
  const createTableQuery = `
DROP TABLE IF EXISTS pokemon;

CREATE TABLE IF NOT EXISTS pokemon (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    primary_type VARCHAR(24) NOT NULL,
    secondary_type VARCHAR(24) NULL,
    image_url VARCHAR(255) NOT NULL,
    hp INT NOT NULL,
    attack INT NOT NULL,
    defense INT NOT NULL,
    sp_atk INT NOT NULL,
    sp_def INT NOT NULL,
    speed INT NOT NULL,
    generation INT NOT NULL,
    legendary BOOLEAN NOT NULL
);`;

  try {
    const res = await pool.query(createTableQuery);
    console.log(res);

    console.log("🎉 pokemon table created successfully");
  } catch (error) {
    console.error("⚠️ error, the pokemon are not pokemoning: ", error);
  }
};

const seedGiftsTable = async () => {
  await seedPkmTable();
  const data = await parser("./data.csv");
  data.map((pkm) => {
    const insertQuery = {
      text: "INSERT INTO pokemon (name, primary_type, secondary_type, hp, attack, defense, sp_atk, sp_def, speed, generation, legendary, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)",
    };
    const values = [
      pkm["Name"],
      pkm["Type 1"],
      pkm["Type 2"],
      pkm["HP"],
      pkm["Attack"],
      pkm["Defense"],
      pkm["Sp. Atk"],
      pkm["Sp. Def"],
      pkm["Speed"],
      pkm["Generation"],
      pkm["Legendary"],
      pkm["ImgUrl"],
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting pokemon", err);
        return;
      }

      console.log(`✅ ${pkm["Name"]} added successfully`);
    });
  });
  return true;
};

seedGiftsTable();
