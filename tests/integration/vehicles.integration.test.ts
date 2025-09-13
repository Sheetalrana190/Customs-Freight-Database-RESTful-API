import request from "supertest";
import app from "../../src/app";
import { AppDataSource } from "../../src/data-source";
import { Vehicle } from "../../src/entities/Vehicle";

let createdId: number;

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  if (createdId) {
    await AppDataSource.getRepository(Vehicle).delete(createdId);
  }
  await AppDataSource.destroy();
});

describe("Vehicle API Integration Tests", () => {
  test("POST /vehicles creates a new vehicle", async () => {
    const res = await request(app)
      .post("/vehicles")
      .send({
        VehicleType: "Cargo Plane",
        Brand: "TestBrand",
        LoadCapacityKg: 15000,
        Year: 2023,
        NumRepairs: 0
      })
      .expect(201);

    createdId = res.body.vehicleid || res.body.VehicleID;
    expect(res.body.Brand).toBe("TestBrand");
  });

  test("GET /vehicles returns array", async () => {
    const res = await request(app).get("/vehicles").expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /vehicles/:id returns the vehicle", async () => {
    const res = await request(app).get(`/vehicles/${createdId}`).expect(200);
    expect(res.body.VehicleID || res.body.vehicleid).toBe(createdId);
  });

  test("PUT /vehicles/:id updates the vehicle", async () => {
    await request(app)
      .put(`/vehicles/${createdId}`)
      .send({ Brand: "UpdatedBrand" })
      .expect(200);

    const updated = await request(app).get(`/vehicles/${createdId}`).expect(200);
    expect(updated.body.Brand).toBe("UpdatedBrand");
  });

  test("DELETE /vehicles/:id deletes the vehicle", async () => {
    await request(app).delete(`/vehicles/${createdId}`).expect(204);
    await request(app).get(`/vehicles/${createdId}`).expect(404);
  });


  test("GET /vehicles/:id returns 404 when vehicle not found", async () => {
    const nonExistentId = 999999; // assuming this ID does not exist
    await request(app)
      .get(`/vehicles/${nonExistentId}`)
      .expect(404);
  });
});
