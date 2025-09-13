import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity({ name: "VehicleCertification" })
export class VehicleCertification {
  @PrimaryColumn({ name: "EmployeeID", type: "int" })
  EmployeeID!: number;

  @PrimaryColumn({ name: "VehicleType" })
  VehicleType!: string;
}
