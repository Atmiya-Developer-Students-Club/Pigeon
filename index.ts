import express from "express";
import mailRoutes from "./src/routes/mailRoutes";
import { PORT } from "./src/utils/config";
import { log } from "./src/utils/logger";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import path from "path";
import cors from "cors";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Pigeon Mailer Microservice API",
      version: "1.0.0",
      description:
        "API for sending bulk and single emails with batching, logging, and API key protection.",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
        description: "Local server",
      },
      {
        url: `https://pigeon.adsc-atmiya.in`,
        description: "Production server",
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "API Key",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app = express();

app.use(cors({
  origin: ["https://adsc.atmiya.in", 'https://events.adsc-atmiya.in'],
  methods: ["GET", "POST"],
}))

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use("/", mailRoutes);

app.listen(PORT, () => {
  log(`Pigeon microservice running on port ${PORT}`);
  log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
