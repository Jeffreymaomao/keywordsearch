const express = require("express");
const app = express("app");

app.use(express.static(__dirname + "/app"));
app.listen(8080, function () {
    console.log("Server is running on http://localhost:8080");
});