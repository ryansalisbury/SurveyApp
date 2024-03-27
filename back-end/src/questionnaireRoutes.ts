import { FastifyInstance } from "fastify";
import {
  Questionnaire,
  RouteParamsWithId,
  SubmissionPayload,
  FormData,
} from "./models/models";
import { request } from "http";
import { ObjectId } from "mongodb";

export default function questionnaireRoutes(server: FastifyInstance) {
  server.get("/api/questionnaires", async (request, reply) => {
    try {
      // Accessing the MongoDB
      const collection = server.mongo.db?.collection("questionnaires");
      // Fetching all the documents in 'questionnaires' collection
      const questionnaires = await collection?.find({}).toArray();

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
    "/api/questionnaires/:id",
    async (request, reply) => {
      try {
        const { id } = request.params;
        const objId = new ObjectId(id);
        const questionnaire = await server.mongo.db
          ?.collection("questionnaires")
          .findOne({ _id: objId });
        if (!questionnaire) {
          return reply.code(404).send({ message: "Questionnaire not found" });
        }
        return reply.send(questionnaire);
      } catch (err) {
        if (err instanceof Error && err.name === "BSONTypeError") {
          return reply
            .code(400)
            .send({ message: "Invalid questionnaire ID format" });
        }
        console.error(err);
        return reply
          .code(500)
          .send({ message: "Failed to fetch questionnaire" });
      }
    }
  );
  server.delete<{ Params: RouteParamsWithId }>(
    "/api/questionnaires/delete/:id",
    async (request, reply) => {
      try {
        // Logic here to delete seleted questionnaire
        const { id } = request.params;
        const questionnaire = await server.mongo.db
          ?.collection("questionnaires")
          .findOneAndDelete({ _id: new ObjectId(id) });
        await server.mongo.db
          ?.collection("submissions")
          .deleteMany({ questionnaireId: id });
        if (!questionnaire) {
          return reply.code(404).send;
        }
        return reply.code(200).send({
          message: "Questionnaire and associated answers deleted successfully",
        });
      } catch (err) {
        console.error(err);
        return reply
          .code(500)
          .send({ message: "Failed to delete selected questionnaire" });
      }
    }
  );
  server.post<{ Body: SubmissionPayload }>(
    "/api/questionnaires/submit-questionnaire",
    async (request, reply) => {
      try {
        const { questionnaireId, answers, userId } = request.body;
        const collection = server.mongo.db?.collection("submissions");

        await collection?.insertOne({
          questionnaireId,
          answers,
          userId,
        });
        return reply
          .code(200)
          .send({ message: "Successfully saved submission" });
      } catch (err) {
        console.error(err);
        return reply.code(500).send({
          message: "Failed to upload questionnaire answers to MongoDB",
        });
      }
    }
  );
  server.get(
    "/api/questionnaires/questionnaireNames",
    async (request, reply) => {
      try {
        const questionnaires = await server.mongo.db
          ?.collection("questionnaires")
          .find({}, { projection: { title: 1 } })
          .toArray();

        reply.send(questionnaires?.map((q) => ({ id: q._id, title: q.title })));
      } catch (error) {
        console.error(error);
        reply
          .status(500)
          .send({ message: "Failed to fetch questionnaire name" });
      }
    }
  );
}
