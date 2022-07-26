const express = require("express");
const cors = require("cors");
const {graphqlHTTP} = require('express-graphql');
const app = express();
const schema = require('./src/schema/schema');
const mongoose = require('mongoose');
app.use(cors());
require('dotenv').config();
mongoose.connect(process.env.DB_URI);
mongoose.connection.once('open', () => {
    console.log('Admin App Connected to the Database');
})

// bind express with graphql
app.use('/graphql', graphqlHTTP({
  // pass in a schema property
  schema,
  graphiql: true
}));


app.get("/", (req, res) => {
  res.json([
    {
      id: "1",
      title: "Admin A",
    },
    {
      id: "2",
      title: "Admin B",
    },
    {
      id: "3",
      title: "Admin C",
    },
    {
      id: "4",
      title: "Admin D",
    },
  ]);
});

app.listen(8001, () => {
  console.log("Admin Service listening for requests on port 8001");
});
