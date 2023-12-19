const db = require("../../db");

const getUsers = (req, res) => {
  // simple query
  let sql = 'SELECT * FROM `users`';
  let sqlValues =  [];                    
  if (req.query.language != null) {
    sql += " where language = ?";
    sqlValues.push(req.query.language);
    if (req.query.city != null) {
      sql += " and city = ?";
      sqlValues.push(req.query.city);
    }
  } else if (req.query.city != null) {
    sql += " where city = ?";
    sqlValues.push(req.query.city);
  }
  db.query(
    sql, sqlValues, 
    (err, results) => {
      console.log(results);
      res.json(results); // results contains rows returned by server
    }
  );
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  db.query(
    'SELECT * FROM `users` WHERE `id` = ?', [id],
    (err, results) => {
      const user = results.find((user) => user.id === id);
      if (user != null) {
        res.status(200).json(user);
      } else {
        res.status(404).send("Not Found");
      }
    }
  );
};

const addUser = (req, res) => {
  console.log(req.body);
  const {firstname, lastname, email, city, language} = req.body;
  db.query(
    'INSERT INTO `users` (`firstname`, `lastname`, `email`, `city`, `language`) VALUES (?, ?, ?, ?, ?)', 
    [firstname, lastname, email, city, language],
    (err, results) => {
      if (err) {
        res.status(422).send(err);
      } else {
        res.status(201).send({id: results.insertId});
      }
    }
  )
}

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const {firstname, lastname, email, city, language} = req.body;
  db.query(
    'UPDATE `users` SET `firstname` = ?, `lastname` = ?, `email` = ?, `city` = ?, `language` = ? WHERE `id` = ?', 
    [firstname, lastname, email, city, language, id],
    (err, results) => {
      if (err) {
        res.status(422).send(err);
      } else {
        res.status(200);
      }
    }
  )
}

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);
  db.query(
    'DELETE FROM `users` WHERE `id` = ?', [id],
    (err, results) => {
      if (err) {
        res.status(422).send(err);
      } else {
        res.status(200);
      }
    }
  )
}

module.exports = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};