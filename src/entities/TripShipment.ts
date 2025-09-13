// src/entities/TripShipment.ts
import { Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "tripshipment" })
export class TripShipment {
  @PrimaryColumn({ name: "tripid", type: "int" })
  TripID!: number;

  @PrimaryColumn({ name: "shipmentid", type: "int" })
  ShipmentID!: number;
}
