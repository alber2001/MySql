const express = require("express");
var morgan = require('morgan')
const cors = require("cors");

const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081",
// };

// app.use(cors(corsOptions));
app.use(cors({
  origin: true, 
  credentials: true  
}));
app.use(morgan('combined'))
app.use(express.json()); /* bodyParser.json() is deprecated */

app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/usuarios.routes.js")(app);
require("./app/routes/aplicaciones.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});