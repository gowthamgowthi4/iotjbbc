import express from "express";
import cors from "cors";
import db from "./db.js";
import router from "./routers/createTables.js";
import userRouter from "./routers/users.js";
import parkRouter from "./routers/parks.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", router);
app.use("/user", userRouter);
app.use("/park", parkRouter);

setInterval(() => db.query("select 1"), 10000);

app.listen(3001, (req, res) => {
  console.log("Listening on PORT 3001...");
});



