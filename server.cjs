const express = require("express");
const app = express();

// serve up production assets
const path = require("path");
app.use(express.static(path.join(__dirname, "/")));

// let the react app to handle any unknown routes
// serve up the index.html if express does'nt recognize the route
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

// if not in production use the port 5000
const PORT = process.env.PORT || 3001;

app.listen(PORT);
