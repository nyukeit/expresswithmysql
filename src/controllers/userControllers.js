const db = require("../../db");

const getUsers = (req, res) => {
  // simple query
  db.query(
    'SELECT * FROM `users`',
    (err, results) => {
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
        res.status(500).send(err);
      } else {
        res.status(201).send({id: results.insertId});
      }
    }
  )
}

module.exports = {
  getUsers,
  getUserById,
  addUser,
};