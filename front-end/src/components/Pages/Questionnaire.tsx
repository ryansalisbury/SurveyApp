import React, { useEffect, useState } from "react";
import DynamicForm from "../dynamicForm/DynamicForm";
import questionnaireData from "../../data/Questionnaire1.json";
import { Questionnaire, Question } from "../../types/questionnaireTypes";
import { validateQuestionnaires } from "../../validation/validation";
import NavBar from "../nav-bar/NavBar";
import { Container, Box, Typography } from "@mui/material";

const QuestionnairePage: React.FC = () => {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(
    null
  );

  useEffect(() => {
    validateQuestionnaires(questionnaireData)
      .then(setQuestionnaire)
      .catch((error) => console.error("Validation error:", error));
  }, []);

  return (
    <div>
      <NavBar />
      {questionnaire ? (
        <Box
          sx={{
            my: 4,
            bgcolor: "#282c34",
            p: 2,
            borderRadius: "4px",
            color: "white",
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            style={{ color: "inherit" }}
          >
            {questionnaire.title}
          </Typography>
          <DynamicForm questionnaire={questionnaire} />
        </Box>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </div>
  );
};
export default QuestionnairePage;
