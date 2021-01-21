import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";
import productRoutes from "./route/productRouter.js";
import userRoutes from "./route/userRoute.js";
import orderRoutes from "./route/orderRoute.js";
import uploadRoutes from "./route/uploadRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddelware.js";
import path from "path";

const app = express();
dotenv.config({ path: "backend/.env" });
connectDB();
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/products", productRoutes);

app.use("/api/users", userRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/");
}

const port = process.env.PORT || 5000;

// noinspection JSCheckFunctionSignatures
app.use(notFound);
// noinspection JSCheckFunctionSignatures
app.use(errorHandler);

// noinspection JSCheckFunctionSignatures
app.listen(
  port,
  console.log(`server running on port ${port}`.yellow.underline)
);
