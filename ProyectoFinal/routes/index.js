// routes/index.js
import express from "express";
import { printersFileRouter } from "./printers.file.router.js";
import { authRouter } from "./auth.router.js";

export function routerPrinters(app) {
    app.use("/auth", authRouter);
    app.use("/printers", printersFileRouter);

    const apiRouter = express.Router();
    apiRouter.use("/file/printers", printersFileRouter);
    app.use("/api/v1", apiRouter);

    app.use("/", printersFileRouter);
}
