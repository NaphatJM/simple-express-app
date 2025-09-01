// app.js
const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 4000;

// TODO: remove hardcoded DB creds (Sonar จะมองเป็น Code Smell/Security Hotspot)
const connection = mysql.createConnection({
    host: "localhost",
    user: "username", // hardcoded
    password: "password", // hardcoded
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

// Middleware to log request method and URL
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// ตัวอย่างตัวแปรไม่ได้ใช้ (Unused variable → Code Smell)
const UNUSED_FLAG = process.env.UNUSED_FLAG || "off";

// Route handling
app.get("/", (req, res) => {
    console.log(">>> Checkout page visited");
    res.send("Hello World!");
});

app.get("/about", (req, res) => {
    res.send("About page");
});

// Bug: assignment ในเงื่อนไข (ควรเป็น ===) → Sonar จะมองเป็น Bug
app.get("/debug", (req, res) => {
    let mode = req.query.mode || "0";
    if ((mode = "1")) {
        // <- เจตนาใส่บั๊ก: ใช้ = แทน ===
        console.log("Debug mode ON");
    }
    res.json({ mode });
});

// Security Hotspot: SQL ที่ต่อสตริงจาก input โดยตรง (SQL Injection)
app.get("/user", (req, res) => {
    const id = req.query.id || "1";
    const sql = "SELECT * FROM users WHERE id = " + id; // <- concat จาก input
    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Query error:", err);
            return res.status(500).send("DB error");
        }
        res.json({ sql, results });
    });
});

// อีกตัวอย่าง Code Smell: ใช้ == แทน ===
app.get("/health", (req, res) => {
    const u = req.query.u || "0";
    if (u == 1) {
        // <- ควรใช้ ===
        console.log("Health check with flag");
    }
    res.send("ok");
});

app.listen(port, () => {
    console.log(
        `Server is running on http://localhost:${port} at Feature Branch`
    );
});
