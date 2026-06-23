import "reflect-metadata";
import express, { type Request as req, type Response as res } from "express";
import { testConnection } from "./config/database.js";
import routes from "./routes/routes.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());
app.use(routes);

app.use(errorMiddleware);

const startServer = async () => {
  await testConnection();

  app.listen(3000, () => {
    console.log("Zenith Server is running on port 3000");
  });
};

startServer();
