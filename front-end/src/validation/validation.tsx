import * as yup from "yup";
import { Questionnaire } from "../types/questionnaireTypes";

// yup validation schema helps with type validation at runtime
export const questionnaireSchema = yup.object({
  id: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
  questions: yup
    .array(
      yup.object({
        id: yup.string().required(),
        type: yup
          .mixed<"multipleChoice" | "boolean" | "rating" | "textInput">()
          .required(),
        text: yup.string().required(),
        options: yup
          .array(
            yup.lazy((item) =>
              (typeof item === "number" ? yup.number() : yup.string()).defined()
            )
          )
          .optional(),
        placeholder: yup.string().optional(),
      })
    )
    .required(),
});

export async function validateQuestionnaires(
  data: any
): Promise<Questionnaire> {
  return await questionnaireSchema.validate(data, { strict: true });
}
