// src/entities/Employee.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "employee" })
export class Employee {
  @PrimaryGeneratedColumn({ name: "employeeid" })
  EmployeeID!: number;

  @Column({ name: "firstname" })
  FirstName!: string;

  @Column({ name: "lastname" })
  LastName!: string;

  @Column({ name: "seniorityyears", type: "int" })
  SeniorityYears!: number;

  @Column({ name: "ismechanic", type: "boolean" })
  IsMechanic!: boolean;
}
