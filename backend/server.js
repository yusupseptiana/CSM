const express = require("express");
const cors = require("cors");
const session = require("express-session");
const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());

// Session untuk admin login
app.use(session({
    secret: 'rahasia_admin_session',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 3600000 } // 1 jam
}));

// Routes
const trainingRoutes = require("./routes/training");
const registrationRoutes = require("./routes/registration");
const adminRoutes = require("./routes/admin");

app.use("/api/training", trainingRoutes);
app.use("/api/register", registrationRoutes);
app.use("/api/admin", adminRoutes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});