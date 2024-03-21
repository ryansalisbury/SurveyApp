import { FastifyInstance } from "fastify";
import { Questionnaire, RouteParamsWithId } from "./models/models";

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
  // Need to pass Params for id input to make this work....
  server.get<{ Params: RouteParamsWithId }>(
    "/questionnaires/:id",
    async (request, reply) => {
      try {
        const { id } = request.params;
        const questionnaire = await server.mongo.db
          ?.collection("questionnaires")
          .findOne({ id: request.params.id });
        if (!questionnaire) {
          return reply.code(404).send({ message: "Questionnaire not found" });
        }
        return reply.send(questionnaire);
      } catch (err) {
        console.error(err);
        return reply
          .code(500)
          .send({ message: "failed to fetch questionnaire" });
      }
    }
  );
  server.delete<{ Params: RouteParamsWithId }>(
    "/questionnaires/delete/:id",
    async (request, reply) => {
      try {
        // Logic here to delete seleted questionnaire
        const { id } = request.params;
        const questionnaire = await server.mongo.db
          ?.collection("questionnaires")
          .findOneAndDelete({ id: request.params.id });
        if (!questionnaire) {
          return reply.code(404).send;
        }
      } catch (err) {
        console.error(err);
        return reply
          .code(500)
          .send({ message: "Failed to delete selected questionnaire" });
      }
    }
  );
}
