# Using MySQL Database with Express.JS to make an API

This project is using a test MySQL DB to return results of Movies / Users (based on query)

### How to Use
1. Clone this Repo
2. Create a MySQL database and source the SQL file 'express_quests.sql'
3. Create a .env file in the root
4. Use the data from ENV Sample file and use your DB Credentials to connect
5. npm run dev

#### Query Movies
```
http://localhost:5000/api/movies
```

#### Query Movie by ID
```
http://localhost:5000/api/movie/{id}
```

#### Query Users
```
http://localhost:5000/api/users
```

#### Query Users by ID
```
http://localhost:5000/api/user/{id}
```
