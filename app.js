const express = require("express");
const path = require("path");
const app = express("app");

app.use(express.static(path.join(__dirname, "dist")));
app.listen(8080, function () {
    console.log("Server is running on http://localhost:8080");
});