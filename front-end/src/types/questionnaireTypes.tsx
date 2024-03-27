export interface Question {
  id: string;
  type: "multipleChoice" | "boolean" | "rating" | "textInput";
  text: string;
  options?: Array<string | number>;
  placeholder?: string;
}

export interface Questionnaire {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface RouteParams {
  id: string;
}

export interface SubmissionPayload {
  questionnaireId: string;
  answers: FormData;
  userId: string;
}

export interface FormData {
  [questionId: string]: string | boolean | number;
}
