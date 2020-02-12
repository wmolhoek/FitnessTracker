const express = require("express");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 9001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const url = process.env.MONGODB_URI || "mongodb://localhost/workout";

mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(function() {
      console.log("MongoDB Connected")
    })
    .catch(function(err) {
      console.log(err)
    })

let apiRoute = require("./routes/api");
apiRoute(app);
let htmlRoute = require("./routes/html")
htmlRoute(app);

app.listen(PORT, function () {
    if (PORT > 9000) {
      console.log("YOUR PORTS!!! It's over nine thousand!!!!!! "  + "(actual level " + PORT + ")");
    } else {
      console.log("Your port level is low" + PORT);
    }
  });