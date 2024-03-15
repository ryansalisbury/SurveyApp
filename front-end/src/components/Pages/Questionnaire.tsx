import React, { useEffect, useState } from "react";
import DynamicForm from "../dynamicForm/DynamicForm";
import questionnaireData from "../../data/Questionnaire1.json";
import { Questionnaire, Question } from "../../types/questionnaireTypes";
import { validateQuestionnaires } from "../../validation/validation";

const QuestionnairePage = () => {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(
    null
  );

  useEffect(() => {
    validateQuestionnaires(questionnaireData)
      .then(setQuestionnaire)
      .catch((error) => console.error("Validation error:", error));
  }, []);
    
  return (
    <div>{questionnaire && <DynamicForm questionnaire={questionnaire} />}</div>
  );
};
export default QuestionnairePage;
