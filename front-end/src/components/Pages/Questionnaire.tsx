import React, { useEffect, useState } from "react";
import DynamicForm from "../dynamicForm/DynamicForm";
import questionnaireData from "../../data/Questionnaire1.json";
import {
  Questionnaire,
  Question,
  RouteParams,
} from "../../types/questionnaireTypes";
import { validateQuestionnaires } from "../../validation/validation";
import NavBar from "../nav-bar/NavBar";
import { Container, Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { fetchQuestionnaireById } from "../../services/questionnaireService";
import { error } from "console";

const QuestionnairePage: React.FC = () => {
  const [questionnaire, setQuestionnaire] = useState<Questionnaire | null>(
    null
  );
  // extracts id from url
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const fetchAndValidateQuestionnaire = async () => {
      try {
        let data;
        console.log(`ID print: ${id}`);
        //checks id is present
        if (id) {
          const response = await fetchQuestionnaireById(id);
          console.log("response log: ", response);
          data = response;
          // data = response.questionnaire;
          // console.log("data retrieved:", data);
        } else {
          //if not then we use exemplar data
          data = questionnaireData;
        }
        // Validate the questionnaire data
        validateQuestionnaires(data)
          .then(setQuestionnaire)
          .catch((error) => console.error("Validation error: ", error));
      } catch (error) {
        console.error(
          "Error fetcjing or validating the questionnaire: ",
          error
        );
      }
    };
    fetchAndValidateQuestionnaire();
  }, [id]);

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
