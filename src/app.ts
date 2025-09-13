import "reflect-metadata";
import express, { Request, Response } from "express";
import vehicleRoutes from "./routes/vehicleRoutes";
import employeeRoutes from "./routes/employeeRoutes";
import shipmentRoutes from "./routes/shipmentRoutes";
import repairRoutes from "./routes/repairRoutes";
import tripRoutes from "./routes/tripRoutes";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("SENG8071 API running");
});

app.use("/vehicles", vehicleRoutes);
app.use("/employees", employeeRoutes);
app.use("/shipments", shipmentRoutes);
app.use("/repairs", repairRoutes);
app.use("/trips", tripRoutes);

export default app;
