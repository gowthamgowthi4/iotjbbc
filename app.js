import express from "express";
import cors from "cors";
import db from "./db.js";
import router from "./routers/createTables.js";
// import router2 from "./routers/createTables.js";
// import router3 from "./routers/createTables.js";
// import router4 from "./routers/createTables.js";
// import router5 from "./routers/createTables.js";
// import router6 from "./routers/createTables.js";
// import router7 from "./routers/createTables.js";
// import router8 from "./routers/createTables.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", router);
// app.use("/", router2);
// app.use("/", router3);
// app.use("/", router4);
// app.use("/", router5);
// app.use("/", router6);
// app.use("/", router7);
// app.use("/", router8);


setInterval(() => db.query("select 1"), 10000);

app.listen(3001, (req, res) => {
    console.log("Listening on PORT 3001...");
});



