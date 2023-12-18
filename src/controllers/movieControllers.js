const db = require("../../db");

const getMovies = (req, res) => {
  // simple query
  db.query(
    'SELECT * FROM `movies`',
    (err, results) => {
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

module.exports = {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
};
