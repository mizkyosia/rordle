import express from "express";

import healthRouter from "./routes/health";
import itemsRouter from "./routes/health";
import { dbErrorHandler } from "./middleware/database";

const app = express();

app.use(express.json());

// ====================== Routers

app.use("/health", healthRouter);

app.use('/items', itemsRouter);

// ====================== Error handling

app.use(dbErrorHandler);

export default app;