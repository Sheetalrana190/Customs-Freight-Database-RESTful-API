// src/entities/Trip.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "trip" })
export class Trip {
  @PrimaryGeneratedColumn({ name: "tripid" })
  TripID!: number;

  @Column({ name: "routefrom" })
  RouteFrom!: string;

  @Column({ name: "routeto" })
  RouteTo!: string;
}
