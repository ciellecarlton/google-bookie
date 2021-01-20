const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const helmet = require("helmet");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));



mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/google-bookie",
  {
    useCreateIndex: true,
    useNewUrlParser: true
  }
);

app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});





app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
