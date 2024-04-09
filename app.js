require('dotenv').config();
const jwt = require('jsonwebtoken');
const querystring = require('querystring');
const express = require('express');
const swagger = require('./swagger');
// const axios = require('axios');
const twilio = require('twilio');
const cors = require('cors');
const app = express();
swagger(app);
const port = 8080;

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};


app.use(cors());
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'client')));

const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const rolesRoutes = require("./routes/roles");
const coursRoutes = require("./routes/cours");
const examRoutes = require("./routes/exam");
const qcmRoutes = require("./routes/qcm");
const testRoutes = require("./routes/test");
const ResultTestRoutes = require("./routes/resultTest");
const ResultExamRoutes = require("./routes/ResultExam");


// Add this middleware to enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// 
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", coursRoutes);
app.use("/", examRoutes);
app.use("/", qcmRoutes);
app.use("/", testRoutes);
app.use("/", rolesRoutes);
app.use("/", ResultExamRoutes);
app.use("/", ResultTestRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
