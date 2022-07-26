const express = require("express");
const cors = require("cors");
const {graphqlHTTP} = require('express-graphql');
const app = express();
const schema = require('./src/schema/schema');
const mongoose = require('mongoose');
require('dotenv').config();
app.use(cors());
mongoose.connect(process.env.DB_URI);
mongoose.connection.once('open', () => {
    console.log('Client App Connected to the Database');
})

// bind express with graphql
app.use('/graphql', graphqlHTTP({
  // pass in a schema property
  schema,
  graphiql: true
}));



app.listen(8002, () => {
  console.log("Client Service listening for requests on port 8002");
});
