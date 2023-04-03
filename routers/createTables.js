import {
    createTable1,
    createTable2,
    createTable3,
    createTable4,
    insertValue1,
    insertValue2,
    insertValue3,
    insertValue4,
} from "../controllers/createTable.js";
import express from "express";
const router = express.Router();


router.get("/parkinginfo", createTable1);
router.get("/userinfo", createTable2);
router.get("/freeslot", createTable3);
router.get("/occupiedslot", createTable4);
router.post("/addparkinginfo", insertValue1);
router.post("/adduserinfo", insertValue2);
router.post("/addfreeslot", insertValue3);
router.post("/addoccupiedslot", insertValue4);

export default router;

