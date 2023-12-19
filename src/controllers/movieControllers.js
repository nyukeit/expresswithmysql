const db = require("../../db");

const getMovies = (req, res) => {
  let sql = 'SELECT * FROM `movies`';
  let sqlValues = [];
  if (req.query.color != null) {
    sql += " where color = ?";
    sqlValues.push(req.query.color);  
    if (req.query.max_duration != null) { 
      sql += " and duration <= ?"; 
      sqlValues.push(req.query.max_duration);  
    } 
  } else if (req.query.max_duration != null) { 
    sql += " where duration <= ?"; 
    sqlValues.push(req.query.max_duration); 
  }
  db.query(
    sql, sqlValues,
    (err, results) => {
      console.log(results);
      res.json(results); // results contains rows returned by server
    }
  );
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  db.query(
    'SELECT * FROM `movies` WHERE `id` = ?', [id],
    (err, results) => {
      const movie = results.find((movie) => movie.id === id);
      if (movie != null) {
        res.json(movie);
      } else {
        res.status(404).send("Not Found");
      }
    }
  );  
};

const addMovie = (req, res) => {
  const {title, director, year, color, duration} = req.body;
  db.query(
    'INSERT INTO `movies` (`title`, `director`, `year`, `color`, `duration`) VALUES (?, ?, ?, ?, ?)', 
    [title, director, year, color, duration],
    (err, results) => {
      if (err) {
        res.status(422).send(err);
      } else {
        res.status(201).send({id: results.insertId});
      }
    }
  )
}

const updateMovie = (req, res) => {
  const id = parseInt(req.params.id);
  const {title, director, year, color, duration} = req.body;
  db.query(
    'UPDATE `movies` SET `title` = ?, `director` = ?, `year` = ?, `color` = ?, `duration` = ? WHERE `id` = ?', 
    [title, director, year, color, duration, id],
    (err, results) => {
      if (err) {
        res.status(422).send(err);
      } else {
        res.status(200);
      }
    }
  )  
}

const deleteMovie = (req, res) => {
  const id = parseInt(req.params.id);
  db.query(
    'DELETE FROM `movies` WHERE `id` = ?', [id],
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
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
