import express from "express";
import cors from "cors";
import db from "./db.js";
import router from "./routers/createTables.js";
import userRouter from "./routers/users.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", router);
app.use("/user", userRouter);

const api1 = (req, res) => {
    let q = "SELECT email FROM userinfo where email = $email"
  
    db.query(q, (err, data) => {
      if (data) return res.status(200).json("User already exists");
      //res.send('Parkinginfo table created!');
      return res.status(500).json();
    });
};

const api2 = (req, res) => {
    let q = "INSERT INTO userinfo VALUES($numberplate, $email, $username, $phonenumber, 600)"
  
    db.query(q, (err, data) => {
      if (data) return res.status(500).json();
      //res.send('Parkinginfo table created!');
      return res.status(200).json("Error!");
    });
};

const api3 = (req, res) => {
    let q1 = "INSERT INTO occupiedslot(slotname, floor, numberplate, email, username, phonenumber) SELECT freeslot.slotname, freeslot.floor, userinfo.numberplate, userinfo.email, userinfo.username, userinfo.phonenumber FROM freeslot, userinfo;"
  
    db.query(q, (err, data) => {
      if (data) return res.status(500).json();
      //res.send('Parkinginfo table created!');
      return res.status(200).json("Error!");
    });
};

async function api_4() {
  const api4 = (req, res) => {
      let q = "SELECT email FROM occupiedslot where email = $email"
    
      db.query(q, (err, data) => {
        if (data) return res.status(200).json("User already exists");
        //res.send('Parkinginfo table created!');
        return res.status(500).json();
        //const [result1] = await connection.execute("DELETE FROM occupiedslot WHERE email = $email");
        //return result1;
      });
  };

  const [result1] = await connection.execute("DELETE FROM occupiedslot WHERE email = $email");
  const [result2] = await connection.execute("UPDATE parkinginfo SET exitTime = NOW(), timediff = TIMEDIFF(MINUTE, exitTime, entryTime), cost = timediff * 0.5 where  email = $email");

}

setInterval(() => db.query("select 1"), 10000);

app.listen(3001, (req, res) => {
  console.log("Listening on PORT 3001...");
});
