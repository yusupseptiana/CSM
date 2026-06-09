const express = require("express");
const cors = require("cors");
const session = require("express-session");
require('dotenv').config(); // Tambahkan ini untuk baca .env

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Nanti ganti dengan URL Vercel
    credentials: true
}));
app.use(express.json());

// Session untuk admin login
app.use(session({
    secret: process.env.SESSION_SECRET || 'rahasia_admin_session',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 3600000 } // 1 jam
}));

// Routes
const trainingRoutes = require("./routes/training");
const registrationRoutes = require("./routes/registration");
const adminRoutes = require("./routes/admin");
const contactRoutes = require("./routes/contact");
const feedbackRoutes = require("./routes/feedback");

app.use("/api/training", trainingRoutes);
app.use("/api/register", registrationRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/feedbacks", feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});