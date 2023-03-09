import cors from "cors";
import passport from 'passport';
import { BasicStrategy } from 'passport-http'
import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();
const app = express();
const port = 3003;
const router = express.Router();

app.use(
  cors({
    credentials: true,
    allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
  })
);


//auth
passport.use(new BasicStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, callback) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return callback(null, false, { message: 'Invalid credentials' });
    }
    const isPasswordValid = (password === user.password);
    if (!isPasswordValid) {
      return callback(null, false, { message: 'Invalid credentials' });
    }
    return callback(null, user);
  } catch (error) {
    console.error(error);
    return callback(error);
  }
}));


app.listen(port, () => {
  console.log(`PokeTracker server listening on port ${port}`);
});


// Route to get all Pokemon
router.get("/pokemon", async (req, res) => {
  try {
    const pokemon = await prisma.pokemon.findMany();
    res.json(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get pokemon" });
  }
});

router.post('/pokemon', passport.authenticate('basic', { session: false }), async (req, res) => {
  const { name, dex_number, type_1, type_2, image_url } = req.body;
  try {
    // Insert the new Pokemon record into the database
    const newPokemon = await prisma.pokemon.create({
      data: {
        name,
        dex_number,
        type_1,
        type_2,
        image_url
      }
    });

    res.status(201).json(newPokemon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.put('/pokemon/:dex_number', passport.authenticate('basic', { session: false }), async (req, res) => {
  const id = parseInt(req.params.dex_number);
  const { name, dex_number, type_1, type_2, image_url } = req.body;
 
  try {
    // Check if the Pokemon exists in the database
    const pokemon = await prisma.pokemon.findUnique({ where: { dex_number:id } });
    if (!pokemon) {
      return res.status(404).json({ message: 'Pokemon not found' });
    }
 
    // Update the Pokemon record in the database
    const updatedPokemon = await prisma.pokemon.update({
      where: { dex_number:id },
      data: {
        name: name || pokemon.name,
        dex_number: dex_number || pokemon.dex_number,
        type_1: type_1 || pokemon.type_1,
        type_2: type_2 || pokemon.type_2,
        image_url: image_url || pokemon.image_url
      }
    });
 
    res.json(updatedPokemon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.delete('/pokemon/:dex_number', passport.authenticate('basic', { session: false }), async (req, res) => {
  const id = parseInt(req.params.dex_number);
 
  try {
    // Check if the Pokemon exists in the database
    const pokemon = await prisma.pokemon.findUnique({ where: { dex_number:id} });
    if (!pokemon) {
      return res.status(404).json({ message: 'Pokemon not found' });
    }
 
    // Delete the Pokemon record from the database
    await prisma.pokemon.delete({ where: { dex_number:id } });
 
    res.json({ message: 'Pokemon deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.use(express.json());
app.use('/api', router);

module.exports = router;