import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialDataMigration1620000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "vehicle" ("vehicleType", "brand", "loadCapacityKg", "year", "numRepairs") VALUES
      ('Cargo Plane', 'Boeing', 20000, 2018, 2),
      ('In-City Truck', 'Ford', 5000, 2020, 1),
      ('Long Haul Truck', 'Volvo', 10000, 2019, 3);
      
      INSERT INTO "employee" ("firstName", "lastName", "seniorityYears", "isMechanic") VALUES
      ('Alice', 'Smith', 5, true),
      ('Bob', 'Johnson', 3, false),
      ('Charlie', 'Lee', 7, true);
      
      -- Add similar inserts for other tables
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "vehicle"`);
    await queryRunner.query(`DELETE FROM "employee"`);
    // Add similar deletes for other tables
  }
}
