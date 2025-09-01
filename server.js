const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 4000;

const connection = mysql.createConnection({
    host: "localhost",
    user: "username",
    password: "password",
    database: "database_name",
});

// Connect to MySQL database
connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL database: " + err.stack);
        return;
    }
    console.log("Connected to MySQL database as id " + connection.threadId);
});

// Middleware: log method และ URL
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Code Smell #1
// TODO: this is first code smell
// Code Smell #2
// TODO: this is second code smell
app.get("/", (req, res) => {
    console.log(">>> Checkout page visited");
    res.send("Hello World!");
});

app.get("/about", (req, res) => {
    res.send("About page");
});

// ใช้ === เพื่อตัดโอกาสเกิด smell/bug เพิ่ม
app.get("/health", (req, res) => {
    const u = req.query.u || "0";
    if (u === "1") {
        console.log("Health check with flag");
    }
    res.send("ok");
});

app.listen(port, () => {
    console.log(
        `Server is running on http://localhost:${port} at Feature Branch`
    );
});
