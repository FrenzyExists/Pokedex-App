import express from 'express';
import path from 'path'
import './config/dotenv.js'

import { fileURLToPath } from 'url';
import pokemonRouter from './routes/pokemon.js';


const app = express();
const port = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.get('/', (req, res) => {
    res.status(200).sendFile(path.join( __dirname, 'home.html'))
})

app.use('/pokemons', pokemonRouter);

app.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}`);
  });
  