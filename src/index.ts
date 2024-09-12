import express from "express";
import rateLimiter from "express-rate-limit";
import routers from "./routes/index.routes";
import config from "./config";
import helmet from "helmet";
import { genericErrorHandler } from "./middlewares/error.middlewares";

const app = express();

const limiter = rateLimiter({
  windowMs: 60 * 1000,
  limit: 10,
  message: "Too many requests",
});

app.use(helmet());
app.use(limiter);
app.use(routers);

app.use(genericErrorHandler);

app.listen(config.PORT, () => {
  console.log(`listening to port ${config.PORT}`);
});
