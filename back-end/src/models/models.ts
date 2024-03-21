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