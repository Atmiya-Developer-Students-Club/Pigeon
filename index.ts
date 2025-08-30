import express from "express";
import mailRoutes from "./src/routes/mailRoutes";
import { PORT } from "./src/utils/config";
import { log } from "./src/utils/logger";

const app = express();

app.use(express.json());
app.use("/", mailRoutes);

app.listen(PORT, () => {
  log(`Pigeon microservice running on port ${PORT}`);
});
