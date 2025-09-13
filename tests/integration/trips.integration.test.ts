import request from "supertest";
import app from "../../src/app";
import { AppDataSource } from "../../src/data-source";
import { Trip } from "../../src/entities/Trip";

let repo: any;
let createdId: number;

beforeAll(async () => {
  await AppDataSource.initialize();
  repo = AppDataSource.getRepository(Trip);
});

afterAll(async () => {
  if (createdId != null) {
    await repo.delete(createdId);
  }
  await AppDataSource.destroy();
});

describe("Trip API", () => {
  test("POST /trips creates a new trip", async () => {
    const res = await request(app)
      .post("/trips")
      .send({
        RouteFrom: "Toronto",
        RouteTo: "Montreal"
      })
      .expect(201);

    createdId = res.body.tripid ?? res.body.TripID ?? res.body.tripID;
    expect(res.body.RouteFrom).toBe("Toronto");
    expect(res.body.RouteTo).toBe("Montreal");
  });

  test("GET /trips returns array", async () => {
    const res = await request(app).get("/trips").expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /trips/:id returns the trip", async () => {
    const res = await request(app).get(`/trips/${createdId}`).expect(200);
    expect(res.body.tripid ?? res.body.TripID ?? res.body.tripID).toBe(createdId);
  });

  test("PUT /trips/:id updates the trip", async () => {
    await request(app)
      .put(`/trips/${createdId}`)
      .send({ RouteTo: "Vancouver" })
      .expect(200);

    const updated = await request(app).get(`/trips/${createdId}`).expect(200);
    expect(updated.body.RouteTo).toBe("Vancouver");
  });

  test("DELETE /trips/:id deletes the trip", async () => {
    await request(app).delete(`/trips/${createdId}`).expect(204);
    await request(app).get(`/trips/${createdId}`).expect(404);
  });

  test("GET /trips/:id returns 404 when trip not found", async () => {
    const nonExistentId = 999999;
    await request(app).get(`/trips/${nonExistentId}`).expect(404);
  });
});
