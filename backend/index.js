const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorMiddleware");

// routes path
const authRoute = require("./routes/authRoute");

dotenv.config();

// mongo connection
connectDB();

// rest object
const app = express();

// middleWares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

// api routes
app.use("/api/v1/auth", authRoute);

// listen
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`.bgCyan.black);
});
