import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "Customer" })
export class Customer {
  @PrimaryGeneratedColumn({ name: "CustomerID" })
  CustomerID!: number;

  @Column({ name: "Name" })
  Name!: string;

  @Column({ name: "Address" })
  Address!: string;

  @Column({ name: "Phone1" })
  Phone1!: string;

  @Column({ name: "Phone2", nullable: true })
  Phone2?: string;
}
