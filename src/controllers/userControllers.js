const db = require("../../db");

const getUsers = (req, res) => {
  // simple query
  db.query(
    'SELECT * FROM `users`',
    (err, results, fields) => {
      res.json(results); // results contains rows returned by server
    }
  );
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);
  db.query(
    'SELECT * FROM `users` WHERE `id` = ?', [id],
    (err, results, fields) => {
      const user = results.find((user) => user.id === id);
      if (user != null) {
        res.status(200).json(user);
      } else {
        res.status(404).send("Not Found");
      }
    }
  );



};

module.exports = {
  getUsers,
  getUserById,
};