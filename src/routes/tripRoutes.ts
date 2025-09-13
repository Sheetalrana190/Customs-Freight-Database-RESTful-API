import { Router } from "express";
import { TripController } from "../controllers/TripController";
const router = Router();

router.get("/", TripController.getAll);
router.get("/:id", TripController.getOne);
router.post("/", TripController.create);
router.put("/:id", TripController.update);
router.delete("/:id", TripController.delete);

export default router;
