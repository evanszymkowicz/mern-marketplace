import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";

// Catch unauthorised errors
app.use((err, req, res, next) => {
	if (err.name === "UnauthorizedError") {
		res.status(401).json({"error" : err.name + ": " + err.message});
	}
});

export default app;
