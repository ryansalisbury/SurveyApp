import axios from "axios";
import { Questionnaire, SubmissionPayload } from "../types/questionnaireTypes";
import { string } from "yup";

// this file is the service class between the backend and the front-end.
// Keeps code cleaner
// Better integration between backend and front-end

const BASE_URL = "http://localhost:3001/api/questionnaires";

export const fetchQuestionnaires = async (): Promise<Questionnaire[]> => {
  const response = await axios.get<Questionnaire[]>(BASE_URL);
  return response.data;
};

export const fetchQuestionnairesNames = async (): Promise<
  { id: string; title: string }[]
> => {
  try {
    const response = await axios.get(`${BASE_URL}/questionnaireNames`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch questionnaire names:", error);
    // INSERT ERROR HANDLING IF WE HAVE TIME!
    return [];
  }
};

export const fetchQuestionnaireById = async (
  id: string
): Promise<Questionnaire> => {
  try {
    const response = await axios.get<Questionnaire>(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch questionnaire");
  }
};

export const questionnaireNewSubmission = async ({
  questionnaireId,
  answers,
  userId,
}: SubmissionPayload) => {
  try {
    const response = await axios.post(`${BASE_URL}/submit-questionnaire`, {
      questionnaireId,
      answers,
      userId,
    });
    console.log("Post response: ", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to submit questionnaire");
  }
};

export const deleteQuestionnaireAndSubmittedAnswers = async (id: string) => {
  try {
    console.log("id: ", id);
    const response = await axios.delete(`${BASE_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete questionnaire and answers");
  }
};
