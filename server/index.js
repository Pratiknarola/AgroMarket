const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./model");
require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());
require('./route/auth.route')(app);
require('./route/user.route')(app);
require("./route/admin.route")(app);
require("./route/farmer.route")(app);
require("./route/buyer.route")(app);
require("./route/auction.route")(app);

const Role = db.role;
const uri = process.env.ATLAS_URI;




// pusher.trigger("my-channel", "my-event", {
//   message: "hello world"
// });

db.mongoose.connect(uri,{useNewUrlParser:true , useCreateIndex: true , useUnifiedTopology:true});
const connection = db.mongoose.connection;
connection.once('open',() => {
  console.log("MongoDB connection established successfully");
  initial();
})
.catch(err => {
  console.error("Connection error", err);
  process.exit();
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "farmer"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        
        console.log("added 'user' to roles collection");
      });
      
      new Role({
        name: "buyer"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        
        console.log("added 'moderator' to roles collection");
      });
      
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        
        console.log("added 'admin' to roles collection");
      });
    }
  });
}

//var corsOptions = {
// origin: "http://localhost:8081"
//};



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});