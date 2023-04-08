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
    let q = `SELECT email FROM userinfo where email = ${req.params.email};`
  
    db.query(q, (err, data) => {
      if (data) return res.status(200).json("User already exists");
      //res.send('Parkinginfo table created!');
      return res.status(500).json(err);
    });
};

const api2 = (req, res) => {
    let q = `INSERT INTO userinfo VALUES(${req.params.numberplate}, ${req.params.email}, ${req.params.username}, ${req.params.phonenumber}, 600);`
  
    db.query(q, (err, data) => {
      if (data) return res.status(200).json(data);
      //res.send('Parkinginfo table created!');
      return res.status(500).json(err);
    });
};

const api3 = (req, res) => {
    let q1 = `INSERT INTO occupiedslot(slotname, floor, numberplate, email, username, phonenumber) SELECT freeslot.slotname, freeslot.floor, userinfo.numberplate, userinfo.email, userinfo.username, userinfo.phonenumber FROM freeslot, userinfo where userinfo.email = ${req.params.email};`
    let q2 = `INSERT INTO parkinginfo(numberplate, entryTime, email, username, status) SELECT numberplate, NOW(), email, username, TRUE FROM occupiedslot where occupiedslot.email = ${req.params.email};`
    
    db.query(q1, (err1, data1) => {
      if (err1) {
        return res.status(500).json(err1);
      }
      else {
        db.query(q2, (err2, data2) => {
          if(err2) {
            return res.status(500).json(err2);
          }
          else {
            return res.status(200).json("Parkinginfo and Occupiedslot Tables updated!");
          }
        })
      }
    });
};

const api4 = (req, res) => {
    let q1 = `SELECT email FROM occupiedslot where email = ${req.params.email}`
    let q2 = `DELETE * FROM occupiedslot WHERE email = ${req.params.email}`
    let q3 = `UPDATE parkinginfo SET exitTime = NOW(), timediff = DATEDIFF(MINUTE, exitTime, entryTime), cost = timediff*0.5 where parkinginfo.email = ${req.params.email}`
    db.query(q1, (err1, data1) => {
      if (err1) return res.status(200).json("User not found!");
      else {
        db.query(q2, (err2, data2) => {
          if(err2) return res.status(200).json("Data cannot be deleted!");
          else {
            db.query(q3, (err3, data3) => {
              if(err3) return res.status(200).json("Data cannot be inserted into parkinginfo Table!");
              else {
                return res.status(500).json("Success!");
              }
            })
          }
        })
      }
    });
};

setInterval(() => db.query("select 1"), 10000);

app.listen(3001, (req, res) => {
  console.log("Listening on PORT 3001...");
});
