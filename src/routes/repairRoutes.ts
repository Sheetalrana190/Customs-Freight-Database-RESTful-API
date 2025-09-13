import { Router } from "express";
import { RepairController } from "../controllers/RepairController";
const router = Router();

router.get("/", RepairController.getAll);
router.get("/:id", RepairController.getOne);
router.post("/", RepairController.create);
router.put("/:id", RepairController.update);
router.delete("/:id", RepairController.delete);

export default router;
