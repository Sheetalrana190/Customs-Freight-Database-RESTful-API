import { Request, Response } from "express";
import { Shipment } from "../entities/Shipment";
import { BaseService } from "../services/BaseService";

const service = new BaseService<Shipment>(Shipment, "ShipmentID");

export class ShipmentController {
  static async getAll(req: Request, res: Response) {
    res.json(await service.findAll());
  }

  static async getOne(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await service.findById(id);
    if (!item) return res.status(404).json({ message: "Shipment not found" });
    res.json(item);
  }

  static async create(req: Request, res: Response) {
    const created = await service.create(req.body);
    res.status(201).json(created);
  }

  static async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const updated = await service.update(id, req.body);
    if (!updated) return res.status(404).json({ message: "Shipment not found" });
    res.json(updated);
  }

  static async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const ok = await service.delete(id);
    if (!ok) return res.status(404).json({ message: "Shipment not found" });
    res.status(204).send();
  }
}
