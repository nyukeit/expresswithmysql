const db = require("../../db");

// const movies = [
//   {
//     id: 1,
//     title: "Citizen Kane",
//     director: "Orson Wells",
//     year: "1941",
//     color: false,
//     duration: 120,
//   },
//   {
//     id: 2,
//     title: "The Godfather",
//     director: "Francis Ford Coppola",
//     year: "1972",
//     color: true,
//     duration: 180,
//   },
//   {
//     id: 3,
//     title: "Pulp Fiction",
//     director: "Quentin Tarantino",
//     year: "1994",
//     color: true,
//     duration: 180,
//   },
// ];

const getMovies = (req, res) => {
  // simple query
  db.query(
    'SELECT * FROM `movies`',
    (err, results, fields) => {
      res.json(results); // results contains rows returned by server
    }
  );
};

const getMovieById = (req, res) => {
  const id = parseInt(req.params.id);
  db.query(
    'SELECT * FROM `movies` WHERE `id` = ?', [id],
    (err, results, fields) => {
      const movie = results.find((movie) => movie.id === id);
      if (movie != null) {
        res.json(movie);
      } else {
        res.status(404).send("Not Found");
      }
    }
  );



};

module.exports = {
  getMovies,
  getMovieById,
};
