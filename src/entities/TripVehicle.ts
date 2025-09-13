// src/entities/TripVehicle.ts
import { Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "tripvehicle" })
export class TripVehicle {
  @PrimaryColumn({ name: "tripid", type: "int" })
  TripID!: number;

  @PrimaryColumn({ name: "vehicleid", type: "int" })
  VehicleID!: number;
}
