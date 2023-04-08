import { park, unpark, getOccupied } from "../controllers/park.js";
import express from "express";
const router = express.Router();

router.get("/getoccupied", getOccupied);
router.post("/park/:email", park);
router.post("/unpark/:email", unpark);

export default router;
