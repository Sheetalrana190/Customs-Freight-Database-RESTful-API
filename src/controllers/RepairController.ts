import { Request, Response } from "express";
import { Repair } from "../entities/Repair";
import { BaseService } from "../services/BaseService";

const service = new BaseService<Repair>(Repair, "RepairID");

export class RepairController {
  static async getAll(req: Request, res: Response) {
    res.json(await service.findAll());
  }

  static async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await service.findById(id);
    if (!item) return res.status(404).json({ message: "Repair not found" });
    res.json(item);
  }

  static async create(req: Request, res: Response) {
    const created = await service.create(req.body);
    res.status(201).json(created);
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await service.update(id, req.body);
    if (!updated) return res.status(404).json({ message: "Repair not found" });
    res.json(updated);
  }

  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const ok = await service.delete(id);
    if (!ok) return res.status(404).json({ message: "Repair not found" });
    res.status(204).send();
  }
}
