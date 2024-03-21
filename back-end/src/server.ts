import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyMongo from "@fastify/mongodb"; // Adjusted import
import dotenv from "dotenv";
import questionnaireRoutes from "./questionnaireRoutes";

dotenv.config();
const mongoDbUri = process.env.MONGODB_URI;
console.log(`MongoDB URI: ${mongoDbUri}`);

const buildServer = () => {
  const server = fastify({ logger: true });

  questionnaireRoutes(server);

  server.register(fastifyCors); // Adjust CORS settings as needed
  server
    .register(fastifyMongo, {
      url: mongoDbUri,
    })
    .after((err) => {
      if (err) console.error("MongoDB connection error:", err);
    });

  // Your route definitions here
  server.get("/ping", async (request, reply) => {
    return { pong: "it works!" };
  });

  return server;
};

const startServer = async () => {
  const server = buildServer();

  try {
    await server.listen({ port: 3001, host: "0.0.0.0" });
    console.log("Server listening on port http://localhost:3001");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
