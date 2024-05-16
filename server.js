require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const projectRouter = require("./router/project-router");
const aboutRouter = require("./router/about-router");
const techstackRouter = require("./router/techstack-router");
const contactRouter = require("./router/contact-router");
const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/app", projectRouter);
app.use("/app", aboutRouter);
app.use("/app", techstackRouter);
app.use("/app", contactRouter);

const PORT = process.env.PORT || 4222;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to the database', err);
});

module.exports = app;
