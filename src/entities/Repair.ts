// src/entities/Repair.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "repair" })
export class Repair {
  @PrimaryGeneratedColumn({ name: "repairid" })
  RepairID!: number;

  @Column({ name: "vehicleid", type: "int" })
  VehicleID!: number;

  @Column({ name: "mechanicid", type: "int" })
  MechanicID!: number;

  @Column({ name: "estimateddays", type: "int" })
  EstimatedDays!: number;

  @Column({ name: "actualdays", type: "int" })
  ActualDays!: number;

  @Column({ name: "repaircost", type: "numeric", nullable: true })
  RepairCost!: number;

  @Column({ name: "startdate", type: "date", nullable: true })
  StartDate!: Date;
}
