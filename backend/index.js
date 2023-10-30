const express = require('express');
const mongoose = require('mongoose');
const fetchData = require('./db');
const app = express();

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
// Middleware to parse JSON requests
app.use(express.json());

app.get("/", (req, res) => {
    res.send("hello");
});

// Assuming 'createUser' is a router module
app.use('/api', require('./Routes/createUser'));
app.use('/api', require('./Routes/displayData'));
app.use('/api', require('./Routes/OrderData'));

app.listen("5000", () => {
    console.log("Server started at port 5000");
});
