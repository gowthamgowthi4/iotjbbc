import db from "../db.js";

export const getOccupied = (req, res) => {
  let q = "SELECT * FROM occupiedslot;";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

export const park = (req, res) => {
  const q1 = "SELECT * FROM freeslot LIMIT 1;";
  const q2 = `SELECT * FROM userinfo WHERE email = '${req.params.email}'`;
  //   const q1 = `INSERT INTO occupiedslot(slotname, floor, numberplate, email, username, phonenumber) SELECT f.slotname, f.floor, u.numberplate, u.email, u.username, u.phonenumber FROM freeslot f, userinfo u where u.email = '${req.params.email}';`;
  //   const q2 = `INSERT INTO parkinginfo(numberplate, entryTime, email, username, status) SELECT numberplate, NOW(), email, username, TRUE FROM occupiedslot where occupiedslot.email = '${req.params.email}';`;

  db.query(q1, (err1, data1) => {
    if (err1) return res.status(500).json(err1);
    else {
      db.query(q2, (err2, data2) => {
        if (err2) return res.status(500).json(err2);
        else {
          data1 = data1[0];
          data2 = data2[0];
          const q3 = `INSERT INTO occupiedslot(slotname, floor, numberplate, email, username, phonenumber) VALUES('${data1?.slotname}',${data1?.floor},'${data2?.numberplate}','${data2?.email}','${data2?.username}','${data2?.phonenumber}')`;
          db.query(q3, (err3, data3) => {
            if (err3) return res.status(500).json(err3);
            else {
              const q4 = `DELETE FROM freeslot WHERE slotname = '${data1?.slotname}'`;
              db.query(q4, (err4, data4) => {
                if (err4) return res.status(500).json(err4);
                else
                  return res
                    .status(200)
                    .json("Added and Deleted Successfully!");
              });
            }
          });
        }
      });
    }
  });

  //   db.query(q1, (err1, data1) => {
  //     if (err1) {
  //       return res.status(500).json(err1);
  //     } else {
  //       db.query(q2, (err2, data2) => {
  //         if (err2) {
  //           return res.status(500).json(err2);
  //         } else {
  //           return res
  //             .status(200)
  //             .json("Parkinginfo and Occupiedslot Tables updated!");
  //         }
  //       });
  //     }
  //   });
};

export const unpark = (req, res) => {
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


// export const park = (req, res) => {
//     const q1 = `INSERT INTO occupiedslot(slotname, floor, numberplate, email, username, phonenumber) SELECT f.slotname, f.floor, u.numberplate, u.email, u.username, u.phonenumber FROM freeslot f, userinfo u where u.email = '${req.params.email}';`;
//     const q2 = `INSERT INTO parkinginfo(numberplate, entryTime, email, username, status) SELECT numberplate, NOW(), email, username, TRUE FROM occupiedslot where occupiedslot.email = '${req.params.email}';`;

//     db.query(q1, (err1, data1) => {
//       if (err1) {
//         return res.status(500).json(err1);
//       } else {
//         db.query(q2, (err2, data2) => {
//           if (err2) {
//             return res.status(500).json(err2);
//           } else {
//             return res
//               .status(200)
//               .json("Parkinginfo and Occupiedslot Tables updated!");
//           }
//         });
//       }
//     });
//   };
