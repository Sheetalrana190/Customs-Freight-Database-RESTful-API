import request from "supertest";
import app from "../../src/app";
import { AppDataSource } from "../../src/data-source";
import { Employee } from "../../src/entities/Employee";

let repo: any;
let createdId: number;

beforeAll(async () => {
  await AppDataSource.initialize();
  repo = AppDataSource.getRepository(Employee);
});

afterAll(async () => {
  if (createdId != null) {
    await repo.delete(createdId);
  }
  await AppDataSource.destroy();
});

describe("Employee API", () => {
  test("POST /employees creates a new employee", async () => {
    const res = await request(app)
      .post("/employees")
      .send({
        FirstName: "Test",
        LastName: "Employee",
        SeniorityYears: 2,
        IsMechanic: true,
      })
      .expect(201);

    createdId = res.body.employeeid ?? res.body.EmployeeID ?? res.body.employeeID;
    expect(res.body.FirstName).toBe("Test");
  });

  test("GET /employees returns array", async () => {
    const res = await request(app).get("/employees").expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /employees/:id returns the employee", async () => {
    const res = await request(app).get(`/employees/${createdId}`).expect(200);
    expect(res.body.employeeid ?? res.body.EmployeeID ?? res.body.employeeID).toBe(createdId);
  });

  test("PUT /employees/:id updates the employee", async () => {
    await request(app)
      .put(`/employees/${createdId}`)
      .send({ LastName: "Updated" })
      .expect(200);

    const updated = await request(app).get(`/employees/${createdId}`).expect(200);
    expect(updated.body.LastName).toBe("Updated");
  });

  test("DELETE /employees/:id deletes the employee", async () => {
    await request(app).delete(`/employees/${createdId}`).expect(204);
    await request(app).get(`/employees/${createdId}`).expect(404);
  });

  test("GET /employees/:id returns 404 when employee not found", async () => {
    const nonExistentId = 999999; // assuming this ID does not exist
    await request(app).get(`/employees/${nonExistentId}`).expect(404);
  });
});
