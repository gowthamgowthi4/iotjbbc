import db from "../db.js";

export const createTable1 = (req, res) => {
  let q =
    "CREATE TABLE parkinginfo(numberplate varchar(50) NOT NULL, entryTime timestamp, exitTime timestamp, email varchar(50) NOT NULL, username varchar(50) NOT NULL, location varchar(50) NOT NULL default 'Vandalur', cost integer default 0, timediff integer default 0, status boolean NOT NULL)";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    //res.send('Parkinginfo table created!');
    return res.status(200).json("Table parking created successfully.");
  });
};

export const createTable2 = (req, res) => {
  let q =
    "CREATE TABLE userinfo(numberplate varchar(50) NOT NULL, email varchar(50) NOT NULL UNIQUE, username varchar(50) NOT NULL UNIQUE, phonenumber varchar(15) NOT NULL, balance integer default 0)";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    //res.send('Userinfo table created!');
    return res.status(200).json("Table userinfo created successfully.");
  });
};

export const createTable3 = (req, res) => {
  let q =
    "CREATE TABLE freeslot(slotname varchar(5) NOT NULL UNIQUE, floor integer NOT NULL)";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    //res.send('Freeslot table created!');
    return res.status(200).json("Table freeslot created successfully.");
  });
};

export const createTable4 = (req, res) => {
  let q =
    "CREATE TABLE occupiedslot(slotname varchar(5) NOT NULL UNIQUE, floor integer NOT NULL, numberplate varchar(50) NOT NULL, email varchar(50) NOT NULL, username varchar(50) NOT NULL UNIQUE, phonenumber varchar(15) NOT NULL)";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    //res.send('Occupiedslot table created!');
    return res.status(200).json("Table occupiedslot created successfully.");
  });
};

export const insertValue1 = (req, res) => {
  let q =
    "INSERT INTO parkinginfo(`numberplate`, `entryTime`, `exitTime`, `email`, `username`, `location`, `cost`, `timediff`, `status`) VALUES(?)";
  const values = [
    req.body.numberplate,
    req.body.entryTime,
    req.body.exitTime,
    req.body.email,
    req.body.username,
    req.body.location,
    req.body.cost,
    req.body.timediff,
    req.body.status,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res
      .status(200)
      .json("Values in the parkinginfo table added successfully!");
  });
};

export const insertValue2 = (req, res) => {
  let q =
    "INSERT INTO userinfo(`numberplate`, `email`, `username`, `phonenumber`, `balance`) VALUES(?)";
  const values = [
    req.body.numberplate,
    req.body.email,
    req.body.username,
    req.body.phonenumber,
    req.body.balance,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res
      .status(200)
      .json("Values in the userinfo table added successfully!");
  });
};

export const insertValue3 = (req, res) => {
  let q = "INSERT INTO freeslot(`slotname`, `floor`) VALUES(?)";
  const values = [req.body.slotname, req.body.floor];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res
      .status(200)
      .json("Values in the freeslot table added successfully!");
  });
};

export const insertValue4 = (req, res) => {
  let q =
    "INSERT INTO occupiedslot(`slotname`, `floor`, `numberplate`, `email`, `username`, `phonenumber`) VALUES(?)";
  const values = [
    req.body.slotname,
    req.body.floor,
    req.body.numberplate,
    req.body.email,
    req.body.username,
    req.body.phonenumber,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res
      .status(200)
      .json("Values in the occupiedslot table added successfully!");
  });
};
