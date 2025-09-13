import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./data-source";

import vehicleRoutes from "./routes/vehicleRoutes";
import employeeRoutes from "./routes/employeeRoutes";
import shipmentRoutes from "./routes/shipmentRoutes";
import repairRoutes from "./routes/repairRoutes";
import tripRoutes from "./routes/tripRoutes";

dotenv.config();

const app = express();
app.use(express.json());

// health check
app.get("/", (req, res) => res.send("SENG8071 API running"));

app.use("/vehicles", vehicleRoutes);
app.use("/employees", employeeRoutes);
app.use("/shipments", shipmentRoutes);
app.use("/repairs", repairRoutes);
app.use("/trips", tripRoutes);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("DB initialization error:", err);
    process.exit(1);
  });
