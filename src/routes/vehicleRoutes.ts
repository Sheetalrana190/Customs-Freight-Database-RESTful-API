import { Router } from "express";
import { VehicleController } from "../controllers/VehicleController";
const router = Router();

router.get("/", VehicleController.getAll);
router.get("/:id", VehicleController.getOne);
router.post("/", VehicleController.create);
router.put("/:id", VehicleController.update);
router.delete("/:id", VehicleController.delete);

export default router;
