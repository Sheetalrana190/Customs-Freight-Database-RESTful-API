// src/entities/TripDriver.ts
import { Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "tripdriver" })
export class TripDriver {
  @PrimaryColumn({ name: "tripid", type: "int" })
  TripID!: number;

  @PrimaryColumn({ name: "employeeid", type: "int" })
  EmployeeID!: number;
}
