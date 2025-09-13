import dotenv from "dotenv";
dotenv.config();

import { AppDataSource } from "./data-source";
import app from "./app";

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("DB initialization error:", err);
    process.exit(1);
  });
