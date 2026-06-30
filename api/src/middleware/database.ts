// src/middleware/error.ts

import { type NextFunction, type Request, type Response } from "express";

export function dbErrorHandler(
    err: unknown,
    _: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err);

    if (isDatabaseConnectionError(err)) {
        return res.status(503).json({
            error: "Database unavailable",
        });
    }

    return res.status(500).json({
        error: "Internal server error",
    });

    next();
}

function isDatabaseConnectionError(error: any): boolean {
    return [
        "ECONNREFUSED",
        "ENOTFOUND",
        "ETIMEDOUT",
        "57P01", // admin_shutdown
        "57P02", // crash_shutdown
        "57P03", // cannot_connect_now
        "08000", // connection_exception
        "08001", // sqlclient_unable_to_establish_sqlconnection
        "08003", // connection_does_not_exist
        "08006", // connection_failure
    ].includes(error?.code);
}