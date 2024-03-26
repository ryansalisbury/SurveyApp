import axios from "axios";
import { Questionnaire } from "../types/questionnaireTypes";

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
): Promise<{ questionnaire: Questionnaire }> => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch questionnaire");
  }
};
