import { FastifyInstance } from "fastify";
import { Questionnaire } from "./models/models";

export default function questionnaireRoutes(server: FastifyInstance) {
  server.get("/questionnaires", async (request, reply) => {
    try {
      console.log("MongoDB Server console.log" + server.mongo.db);

      // Accessing the MongoDB
      const collection = server.mongo.db?.collection("questionnaires");
      // Fetching all the documents in 'questionnaires' collection
      const questionnaires = await collection?.find({}).toArray();

      console.log("Questionnaire log: " + questionnaires);
      // sends questionnaires as a response
      return reply.send(questionnaires);
    } catch (err) {
      console.error(err);
      return reply
        .code(500)
        .send({ message: "Failed to fetch questionnaires" });
    }
  });
}
