import request from "supertest";
import app from "../../src/app";
import { AppDataSource } from "../../src/data-source";
import { Shipment } from "../../src/entities/Shipment";

let repo: any;
let createdId: number;

beforeAll(async () => {
  await AppDataSource.initialize();
  repo = AppDataSource.getRepository(Shipment);
});

afterAll(async () => {
  if (createdId != null) {
    await repo.delete(createdId);
  }
  await AppDataSource.destroy();
});

describe("Shipment API", () => {
  test("POST /shipments creates a new shipment", async () => {
    const res = await request(app)
      .post("/shipments")
      .send({
        CustomerID: 1,
        WeightKg: 1000,
        Value: 5000.0,
        Origin: "Toronto",
        Destination: "Montreal",
      })
      .expect(201);

    createdId = res.body.shipmentid ?? res.body.ShipmentID ?? res.body.shipmentID;
    expect(res.body.WeightKg).toBe(1000);
    expect(res.body.Destination).toBe("Montreal");
  });

  test("GET /shipments returns array", async () => {
    const res = await request(app).get("/shipments").expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /shipments/:id returns the shipment", async () => {
    const res = await request(app).get(`/shipments/${createdId}`).expect(200);
    expect(res.body.shipmentid ?? res.body.ShipmentID ?? res.body.shipmentID).toBe(createdId);
  });

  test("PUT /shipments/:id updates the shipment", async () => {
    await request(app)
      .put(`/shipments/${createdId}`)
      .send({ Destination: "Vancouver" })
      .expect(200);

    const updated = await request(app).get(`/shipments/${createdId}`).expect(200);
    expect(updated.body.Destination).toBe("Vancouver");
  });

  test("DELETE /shipments/:id deletes the shipment", async () => {
    await request(app).delete(`/shipments/${createdId}`).expect(204);
    await request(app).get(`/shipments/${createdId}`).expect(404);
  });

  test("GET /shipments/:id returns 404 when shipment not found", async () => {
    const nonExistentId = 999999;
    await request(app).get(`/shipments/${nonExistentId}`).expect(404);
  });
});
