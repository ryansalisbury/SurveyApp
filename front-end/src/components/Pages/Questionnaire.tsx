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
import { string } from "yup";
import { useQuery } from "react-query";

const QuestionnairePage: React.FC = () => {
  // extracts id from url
  const { id } = useParams<{ id: string }>();

  const {
    data: questionnaire,
    isLoading,
    error,
  } = useQuery<Questionnaire, Error>(
    ["fetchQuestionnaire", id],
    () => fetchQuestionnaireById(id!),
    {
      initialData: id ? undefined : (questionnaireData as Questionnaire),
    }
  );

  console.log({ questionnaire, isLoading, error });

  return (
    <div>
      <NavBar />
      {isLoading ? (
        <Typography>Loading...</Typography>
      ) : error ? (
        <Typography>Error: {error.message}</Typography>
      ) : (
        questionnaire && (
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
        )
      )}
    </div>
  );
};
export default QuestionnairePage;
