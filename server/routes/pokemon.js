import express from "express";
// import '../config/dotenv.js'
import { pool } from "../config/database.js";

const pokemonRouter = express.Router();

pokemonRouter.get("/", async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  const pSize = Number(limit) * (Number(page) - 1);

  try {
    const results = await pool.query(
      `SELECT name, image_url, primary_type, secondary_type FROM pokemon ORDER BY id ASC LIMIT ${limit} OFFSET ${pSize}`
    );

    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
});

pokemonRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const results = await pool.query(
      `SELECT name, image_url, primary_type, secondary_type, hp, attack, defense, sp_atk, sp_def, speed, legendary FROM pokemon WHERE id=${id} LIMIT 1`
    );
    console.log(results.rows[0]);
    
    res.status(200).json(results.rows[0]||{"message": `No Pokemon with id ${id} got found`});
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
});

export default pokemonRouter;
