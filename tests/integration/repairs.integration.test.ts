import request from "supertest";
import app from "../../src/app";
import { AppDataSource } from "../../src/data-source";
import { Repair } from "../../src/entities/Repair";

let repo: any;
let createdId: number;

beforeAll(async () => {
  await AppDataSource.initialize();
  repo = AppDataSource.getRepository(Repair);
});

afterAll(async () => {
  if (createdId != null) {
    await repo.delete(createdId);
  }
  await AppDataSource.destroy();
});

describe("Repair API", () => {
  test("POST /repairs creates a new repair", async () => {
    const res = await request(app)
      .post("/repairs")
      .send({
        VehicleID: 1,          
        MechanicID: 1,         
        EstimatedDays: 5,
        ActualDays: 4,
        RepairCost: 1200.50,
        StartDate: "2025-08-12" 
      })
      .expect(201);

    createdId = res.body.repairid ?? res.body.RepairID ?? res.body.repairID;
    expect(res.body.RepairCost).toBe(1200.50);
  });

  test("GET /repairs returns array", async () => {
    const res = await request(app).get("/repairs").expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /repairs/:id returns the repair", async () => {
    const res = await request(app).get(`/repairs/${createdId}`).expect(200);
    expect(res.body.repairid ?? res.body.RepairID ?? res.body.repairID).toBe(createdId);
  });

  test("PUT /repairs/:id updates the repair", async () => {
    await request(app)
      .put(`/repairs/${createdId}`)
      .send({ ActualDays: 6 })
      .expect(200);

    const updated = await request(app).get(`/repairs/${createdId}`).expect(200);
    expect(updated.body.ActualDays).toBe(6);
  });

  test("DELETE /repairs/:id deletes the repair", async () => {
    await request(app).delete(`/repairs/${createdId}`).expect(204);
    await request(app).get(`/repairs/${createdId}`).expect(404);
  });

  test("GET /repairs/:id returns 404 when repair not found", async () => {
    const nonExistentId = 999999;
    await request(app).get(`/repairs/${nonExistentId}`).expect(404);
  });
});
