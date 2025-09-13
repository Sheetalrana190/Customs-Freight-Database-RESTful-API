# 🚚 SENG8071 Final Project — Customs Freight Company API

This project is the **final assignment** for SENG8071 at Conestoga College.  
It implements a **RESTful API** using **TypeScript**, **TypeORM**, **PostgreSQL**, and **Jest** for testing.  
The API manages **Vehicles**, **Employees**, **Shipments**, **Repairs**, and **Trips** for a freight company.

---

## 📦 1. Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)
- [Docker Desktop](https://www.docker.com/) (or native Docker for Linux)
- [pgAdmin](https://www.pgadmin.org/) for database GUI (optional but recommended)
- [Postman](https://www.postman.com/) for API testing (optional, you can also use curl)

---

## ⚙ 2. Installation Steps (After Downloading ZIP)

### Step 1 — Extract Project
1. Download the ZIP file
2. Extract it to a folder, e.g., `seng8071-final`

```bash
cd seng8071-final
````

---

### Step 2 — Install Dependencies

```bash
npm install
```

---

### Step 3 — Create `.env` File

In the project root, create a `.env` file with your database connection info:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=Project
```

---

### Step 4 — Start PostgreSQL in Docker

If you don’t already have Postgres running:

```bash
docker run --name postgres-seng8071 -e POSTGRES_PASSWORD=yourpassword -p 5432:5432 -d postgres
```

---

### Step 5 — Create the Database & Load Data

1. Open pgAdmin
2. Create a database named **`Project`**
3. Run the `midterm.sql` script from the project to create tables and insert sample data

---

### Step 6 — Run the API

```bash
npm run dev
```

The API should start on:

```
http://localhost:3000
```

Check with:

```bash
curl http://localhost:3000
```

You should see:

```
SENG8071 API running
```

---

## 📡 3. Available API Endpoints

| Entity    | Method | Endpoint                    | Description       |
| --------- | ------ | --------------------------- | ----------------- |
| Vehicles  | GET    | `/vehicles`                 | Get all vehicles  |
|           | GET    | `/vehicles/:id`             | Get vehicle by ID |
|           | POST   | `/vehicles`                 | Create vehicle    |
|           | PUT    | `/vehicles/:id`             | Update vehicle    |
|           | DELETE | `/vehicles/:id`             | Delete vehicle    |
| Employees | ...    | `/employees` (same pattern) | Manage employees  |
| Shipments | ...    | `/shipments` (same pattern) | Manage shipments  |
| Repairs   | ...    | `/repairs` (same pattern)   | Manage repairs    |
| Trips     | ...    | `/trips` (same pattern)     | Manage trips      |

---

## 🖥 4. Example cURL Commands

### Vehicles

```bash
# Create
curl -X POST http://localhost:3000/vehicles \
-H "Content-Type: application/json" \
-d '{"VehicleType":"Cargo Plane","Brand":"Lockheed","LoadCapacityKg":22000,"Year":2023,"NumRepairs":0}'

# Read All
curl http://localhost:3000/vehicles

# Read One
curl http://localhost:3000/vehicles/1

# Update
curl -X PUT http://localhost:3000/vehicles/1 \
-H "Content-Type: application/json" \
-d '{"Brand":"UpdatedBrand"}'

# Delete
curl -X DELETE http://localhost:3000/vehicles/1
```

---

## 🧪 5. Running Tests

### Unit Tests (Mock DB)

```bash
npm run test:unit
```

### Integration Tests (Real DB)

```bash
npm run test:integration
```

### Run All Tests

```bash
npm test
```

---

## 📜 6. Notes

* **Do not** run integration tests on production data.
* Integration tests will insert and delete rows from the database.
* Make sure Postgres is running before starting the API.




