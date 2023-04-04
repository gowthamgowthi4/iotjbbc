import {
  getUser,
  checkUser,
  getUserByPlate,
  getUserByEmail,
} from "../controllers/user.js";
import express from "express";
const router = express.Router();

router.get("/getusers", getUser);
router.get("/getuserbyplate/:plate", getUserByPlate);
router.get("/getuserbyemail/:email", getUserByEmail);
router.get("/checkuser/:email", checkUser);

export default router;
