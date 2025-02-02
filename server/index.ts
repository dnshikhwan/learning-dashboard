import express, { Express } from "express";
import compression from "compression";
import dotenv from "dotenv";
import cors from "cors";

import "./interfaces/express.interface";
import { createRouter } from "./router";
import { logger } from "./helpers/log.helper";
import { requestLogger } from "./middlewares/request.middleware";
import { errorHandler } from "./helpers/error.helper";
import { dbInit } from "./helpers/pg.helper";
import bodyParser from "body-parser";
import { corsOptions } from "./configs";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT: string | number = process.env.PORT || 5000;
const app: Express = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());
app.use(errorHandler);
app.use(requestLogger);
app.use("/api", createRouter());

app.listen(PORT, () => {
  dbInit();
  logger.info(`Server is running on port ${PORT}`);
});
