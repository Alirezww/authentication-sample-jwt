const mongoose = require("mongoose")
const express = require("express")
const http = require("http")

mongoose.connect("mongodb://localhost:27017/TokenTest", (err) => {
    if(!err) console.log("connected to db...")
})

const app = express();

require('dotenv').config();

app.use(express.urlencoded({ extended : false }));
app.use(express.json())

app.use("/auth", require("./routes/user"))

app.use((req, res) => {
    return res.status(404).json({
        status : 404,
        success : false,
        message : "Not Found!!!"
    })
})
app.use((error, req, res, next) => {
    const status = error?.status || error?.code || 500;
    const message = error?.message || "InternalServerError";

    return res.status(status).json({
        status,
        message,
        success : false
    })
})

http.createServer(app).listen(5000, () => {
    console.log("The server is running on port 5000")
})