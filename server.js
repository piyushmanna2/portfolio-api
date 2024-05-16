require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const projectRouter = require("./router/project-router");
const aboutRouter = require("./router/about-router");
const techstackRouter = require("./router/techstack-router");
const contactRouter = require("./router/contact-router");
const cluster = require("node:cluster");
const os = require("node:os");
const numCPUs = os.cpus().length;
const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());

const PORT = 4222;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
    cluster.fork();
  });
} else {
  connectDb().then(() => {
    app.use("/app", projectRouter);
    app.use("/app", aboutRouter);
    app.use("/app", techstackRouter);
    app.use("/app", contactRouter);

    app.listen(PORT, () => {
      console.log(`Worker ${process.pid} is listening on port http://localhost:${PORT}`);
    });
  }).catch(err => {
    console.error('Failed to connect to the database', err);
  });
}

module.exports = app;
