import express from "express";

const pokemonRouter = express.Router();

pokemonRouter.get('/', async (req, res) => {

    const {page = 1, limit = 10} = req.query;

    const start = (Number(page) - 1) * Number(limit); 
    const end = start + Number(limit) - 1; 

    return res.json({"boi": "dsds"})
})


export default pokemonRouter;