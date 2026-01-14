/* Create dotenv config */
require("dotenv").config();

/* Create constants */
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const logsRoutes = require("./routes/logs");
const mealsRoutes = require("./routes/meals");
const { checkUser } = require("./middleware/authMiddleware");
const port = process.env.PORT;
const uri = process.env.MONGOOSE_URI;

/* Parse responses */
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());

/* Configure CORS */
app.use(
  cors({
    origin: "https://glucose-monitor-frontend.onrender.com",
    credentials: true,
  })
);

/* Use routes */
app.use(checkUser);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/logs", logsRoutes);
app.use("/api/meals", mealsRoutes);

/* Connect to MongoDB */
const mongooseConnect = async () => {
  try {
    await mongoose.connect(uri);
    app.listen(port, () => {
      console.log(`✅ App listening on port ${port}`);
    });
  } catch (error) {
    console.error(error.message);
    console.log("❌ Could not connect to MongoDB");
  }
};
mongooseConnect();
