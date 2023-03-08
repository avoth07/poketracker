import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const pokemon = await prisma.pokemon.findMany();
    res.json(pokemon);
  }catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get pokemon" });
  }
});

router.post("/", async (req, res) => {
  try {
    const pokemon = await prisma.pokemon.create({ data: req.body });
    res.json(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create pokemon" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const pokemon = await prisma.pokemon.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json(pokemon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update pokemon" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await prisma.pokemon.delete({ where: { id: parseInt(req.params.id) } });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete pokemon" });
  }
});

export default router;