// src/entities/Vehicle.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "vehicle" })
export class Vehicle {
  @PrimaryGeneratedColumn({ name: "vehicleid" })
  VehicleID!: number;

  @Column({ name: "vehicletype" })
  VehicleType!: string;

  @Column({ name: "brand" })
  Brand!: string;

  @Column({ name: "loadcapacitykg", type: "int" })
  LoadCapacityKg!: number;

  @Column({ name: "year", type: "int" })
  Year!: number;

  @Column({ name: "numrepairs", type: "int", nullable: true })
  NumRepairs!: number;
}
