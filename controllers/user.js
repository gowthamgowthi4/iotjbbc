import db from "../db.js";

export const getUser = (req, res) => {
  let q = "SELECT * FROM userinfo;";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const checkUser = (req, res) => {
  let q = `SELECT * FROM userinfo WHERE email='${req.params.email}';`;
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(200).json({ status: 0 });
    return res.status(200).json({ status: 1 });
  });
};

export const getUserByPlate = (req, res) => {
  let q = `SELECT * FROM userinfo WHERE numberplate='${req.params.plate}';`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};

export const getUserByEmail = (req, res) => {
  let q = `SELECT * FROM userinfo WHERE email='${req.params.email}';`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data[0]);
  });
};
