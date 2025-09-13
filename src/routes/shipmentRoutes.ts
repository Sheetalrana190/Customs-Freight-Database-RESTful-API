import { Router } from "express";
import { ShipmentController } from "../controllers/ShipmentController";
const router = Router();

router.get("/", ShipmentController.getAll);
router.get("/:id", ShipmentController.getOne);
router.post("/", ShipmentController.create);
router.put("/:id", ShipmentController.update);
router.delete("/:id", ShipmentController.delete);

export default router;
