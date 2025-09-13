// src/entities/Shipment.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "shipment" })
export class Shipment {
  @PrimaryGeneratedColumn({ name: "shipmentid" })
  ShipmentID!: number;

  @Column({ name: "customerid", type: "int" })
  CustomerID!: number;

  @Column({ name: "weightkg", type: "int" })
  WeightKg!: number;

  @Column({ name: "value", type: "numeric" })
  Value!: number;

  @Column({ name: "origin" })
  Origin!: string;

  @Column({ name: "destination" })
  Destination!: string;
}
