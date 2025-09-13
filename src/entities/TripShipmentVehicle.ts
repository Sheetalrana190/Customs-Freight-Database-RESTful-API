// src/entities/TripShipmentVehicle.ts
import { Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "tripshipmentvehicle" })
export class TripShipmentVehicle {
  @PrimaryColumn({ name: "tripid", type: "int" })
  TripID!: number;

  @PrimaryColumn({ name: "shipmentid", type: "int" })
  ShipmentID!: number;

  @PrimaryColumn({ name: "vehicleid", type: "int" })
  VehicleID!: number;
}
